module.exports = {
  apps: [{
    name: 'aicamp-diagnosis',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000 -H 0.0.0.0',
    cwd: process.cwd(),
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0',
      DOMAIN: 'aicamp.club',
      OLLAMA_API_URL: 'http://localhost:11434',
      OLLAMA_MODEL: 'gpt-oss:20b',
      OLLAMA_TIMEOUT: '600000',
      NEXT_PUBLIC_BASE_URL: 'https://aicamp.club',
      NEXT_PUBLIC_DOMAIN: 'aicamp.club'
    },
    instances: 'max',
    exec_mode: 'cluster',
    time: true,
    max_memory_restart: '2G',
    out_file: './logs/out.log',
    error_file: './logs/err.log',
    log_file: './logs/combined.log',
    watch: false,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
