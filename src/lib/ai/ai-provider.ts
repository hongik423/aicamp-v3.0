/**
 * 통합 AI 프로바이더 (Llama 우선)
 * - 지원: Ollama(로컬), Groq, Together, OpenRouter, Gemini(호환 유지)
 * - 외부 SDK 없이 fetch 기반으로 구현
 */

export type AIProvider = 'ollama' | 'groq' | 'together' | 'openrouter' | 'gemini';

export interface ChatHistoryItem {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CallAIParams {
  prompt?: string;
  system?: string;
  history?: ChatHistoryItem[];
  temperature?: number;
  maxTokens?: number;
  model?: string;
  timeoutMs?: number;
}

function getEnv(name: string, defaultValue: string = ''): string {
  return process.env[name] || defaultValue;
}

function getProvider(): AIProvider {
  const provider = (getEnv('AI_PROVIDER', 'ollama') as AIProvider);
  return provider;
}

function getModelForProvider(provider: AIProvider, override?: string): string {
  if (override) return override;
  switch (provider) {
    case 'ollama':
      return getEnv('OLLAMA_MODEL', 'gpt-oss:20b');
    case 'groq':
      return getEnv('GROQ_MODEL', 'llama-3.1-70b-versatile');
    case 'together':
      return getEnv('TOGETHER_MODEL', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo');
    case 'openrouter':
      return getEnv('OPENROUTER_MODEL', 'meta-llama/llama-3.1-70b-instruct');
    case 'gemini':
      return getEnv('GEMINI_MODEL', 'gemini-2.5-flash-exp');
    default:
      return 'gpt-oss:20b';
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return new Promise<T>((resolve, reject) => {
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

function normalizeHistoryToText(history?: ChatHistoryItem[], system?: string, userPrompt?: string): string {
  const parts: string[] = [];
  if (system && system.trim().length > 0) {
    parts.push(`[System]\n${system.trim()}`);
  }
  if (history && history.length > 0) {
    for (const h of history) {
      parts.push(`[${h.role}]\n${h.content}`);
    }
  }
  if (userPrompt && userPrompt.trim().length > 0) {
    parts.push(`[user]\n${userPrompt.trim()}`);
  }
  return parts.join('\n\n');
}

export async function callAI(params: CallAIParams): Promise<string> {
  const provider = getProvider();
  const temperature = params.temperature ?? 0.7;
  const maxTokens = params.maxTokens ?? 8192; // GPT-OSS 20B 최적화된 토큰 수
  const timeoutMs = params.timeoutMs ?? 900000; // 15분 (Ollama 최적화)
  const model = getModelForProvider(provider, params.model);
  
  console.log(`🤖 Ollama GPT-OSS 20B AI 호출: ${provider}/${model} (토큰: ${maxTokens}, 온도: ${temperature})`);

  // Ollama 우선 시도, 실패 시 Gemini 폴백
  try {
    switch (provider) {
      case 'ollama':
        return await withTimeout(callOllama({ ...params, model, temperature, maxTokens }), timeoutMs);
      case 'groq':
        return await withTimeout(callOpenAICompatible({ ...params, model, temperature, maxTokens }, 'https://api.groq.com/openai/v1', getEnv('GROQ_API_KEY')), timeoutMs);
      case 'together':
        return await withTimeout(callOpenAICompatible({ ...params, model, temperature, maxTokens }, 'https://api.together.xyz/v1', getEnv('TOGETHER_API_KEY')), timeoutMs);
      case 'openrouter':
        return await withTimeout(callOpenAICompatible({ ...params, model, temperature, maxTokens }, 'https://openrouter.ai/api/v1', getEnv('OPENROUTER_API_KEY')), timeoutMs);
      case 'gemini':
        return await withTimeout(callGemini({ ...params, model, temperature, maxTokens }), timeoutMs);
      default:
        return await withTimeout(callOllama({ ...params, model, temperature, maxTokens }), timeoutMs);
    }
  } catch (error) {
    console.warn(`${provider} 호출 실패, Gemini로 폴백:`, error);
    // 모든 프로바이더 실패 시 Gemini 폴백
    return await withTimeout(callGemini({ 
      ...params, 
      model: 'gemini-2.5-flash-exp', 
      temperature, 
      maxTokens 
    }), 600000); // Gemini는 10분 타임아웃
  }
}

async function callOllama(params: Required<Pick<CallAIParams, 'model' | 'temperature' | 'maxTokens'>> & CallAIParams): Promise<string> {
  const apiUrl = getEnv('OLLAMA_API_URL', 'http://localhost:11434');
  const model = params.model || getEnv('OLLAMA_MODEL', 'gpt-oss:20b');
  
  if (!apiUrl) {
    throw new Error('OLLAMA_API_URL이 설정되지 않았습니다.');
  }

  const prompt = normalizeHistoryToText(params.history, params.system, params.prompt);
  
  console.log(`🚀 Ollama GPT-OSS 20B 호출 시작: ${model}`);
  
  const res = await fetch(`${apiUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: params.temperature,
        num_predict: params.maxTokens,
        top_k: 40,
        top_p: 0.95,
        repeat_penalty: 1.1,
        stop: ["<|im_end|>", "<|endoftext|>", "Human:", "Assistant:"],
        // GPT-OSS 20B 최적화 설정
        num_ctx: 32768, // 컨텍스트 윈도우 확장
        num_thread: 8,   // 멀티스레딩 최적화
        num_gpu: 1       // GPU 가속 활용
      }
    }),
    signal: AbortSignal.timeout(900000) // 15분 타임아웃
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Ollama GPT-OSS 20B Error ${res.status}: ${txt}`);
  }
  
  const json = await res.json();
  const response = json.response || '';
  
  console.log(`✅ Ollama GPT-OSS 20B 응답 완료: ${response.length} 문자`);
  return response;
}

async function callOpenAICompatible(params: Required<Pick<CallAIParams, 'model' | 'temperature' | 'maxTokens'>> & CallAIParams, baseUrl: string, apiKey?: string): Promise<string> {
  if (!apiKey) {
    throw new Error('OpenAI 호환 API 키가 설정되지 않았습니다.');
  }
  const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
  const messages: Array<{ role: string; content: string }> = [];
  if (params.system) messages.push({ role: 'system', content: params.system });
  if (params.history) {
    for (const h of params.history) messages.push({ role: h.role, content: h.content });
  }
  if (params.prompt) messages.push({ role: 'user', content: params.prompt });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: params.model,
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      messages
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI compatible Error ${res.status}: ${txt}`);
  }
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content || '';
  return text;
}



async function callGemini(params: Required<Pick<CallAIParams, 'model' | 'temperature' | 'maxTokens'>> & CallAIParams): Promise<string> {
  const apiKey = getEnv('GEMINI_API_KEY');
  const apiUrl = getEnv('GEMINI_API_URL', 'https://generativelanguage.googleapis.com/v1beta/models');
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
  }
  const modelPath = `${apiUrl.replace(/\/$/, '')}/${params.model}:generateContent`;
  const text = normalizeHistoryToText(params.history, params.system, params.prompt);
  const res = await fetch(`${modelPath}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        temperature: params.temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: params.maxTokens
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
      ]
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini Error ${res.status}: ${txt}`);
  }
  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export function extractJsonFromText(text: string): any | null {
  try {
    const jsonFence = text.match(/```json\s*([\s\S]*?)\s*```/);
    const candidate = jsonFence ? jsonFence[1] : text;
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}


