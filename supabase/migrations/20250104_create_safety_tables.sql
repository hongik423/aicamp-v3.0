-- Safety Master 데이터베이스 테이블 생성
-- 사용자별 취약문제 및 학습이력 관리

-- 사용자 취약문제 테이블
CREATE TABLE IF NOT EXISTS user_weak_problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    card_id VARCHAR(255) NOT NULL,
    last_score INTEGER NOT NULL CHECK (last_score >= 0 AND last_score <= 100),
    attempts INTEGER NOT NULL DEFAULT 1 CHECK (attempts > 0),
    needs_review BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- 복합 인덱스를 위한 유니크 제약조건
    UNIQUE(user_id, card_id)
);

-- 사용자 학습이력 테이블
CREATE TABLE IF NOT EXISTS user_learning_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    session_at TIMESTAMP WITH TIME ZONE NOT NULL,
    studied INTEGER NOT NULL DEFAULT 0 CHECK (studied >= 0),
    correct INTEGER NOT NULL DEFAULT 0 CHECK (correct >= 0),
    duration_sec INTEGER NOT NULL DEFAULT 0 CHECK (duration_sec >= 0),
    mode VARCHAR(50) NOT NULL DEFAULT 'card' CHECK (mode IN ('card', 'immersive', 'slide', 'test')),
    accuracy DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN studied > 0 THEN ROUND((correct::DECIMAL / studied::DECIMAL) * 100, 2)
            ELSE 0
        END
    ) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 사용자 통계 테이블 (집계 데이터)
CREATE TABLE IF NOT EXISTS user_learning_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    total_sessions INTEGER NOT NULL DEFAULT 0,
    total_studied INTEGER NOT NULL DEFAULT 0,
    total_correct INTEGER NOT NULL DEFAULT 0,
    total_duration_sec INTEGER NOT NULL DEFAULT 0,
    average_accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_study_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_weak_problems_user_id ON user_weak_problems(user_id);
CREATE INDEX IF NOT EXISTS idx_user_weak_problems_card_id ON user_weak_problems(card_id);
CREATE INDEX IF NOT EXISTS idx_user_weak_problems_needs_review ON user_weak_problems(needs_review);
CREATE INDEX IF NOT EXISTS idx_user_weak_problems_updated_at ON user_weak_problems(updated_at);

CREATE INDEX IF NOT EXISTS idx_user_learning_history_user_id ON user_learning_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_history_session_at ON user_learning_history(session_at);
CREATE INDEX IF NOT EXISTS idx_user_learning_history_mode ON user_learning_history(mode);

CREATE INDEX IF NOT EXISTS idx_user_learning_stats_user_id ON user_learning_stats(user_id);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE user_weak_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_stats ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 데이터만 접근 가능
CREATE POLICY "Users can view their own weak problems" ON user_weak_problems
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can insert their own weak problems" ON user_weak_problems
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update their own weak problems" ON user_weak_problems
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can delete their own weak problems" ON user_weak_problems
    FOR DELETE USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can view their own learning history" ON user_learning_history
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can insert their own learning history" ON user_learning_history
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update their own learning history" ON user_learning_history
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can delete their own learning history" ON user_learning_history
    FOR DELETE USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can view their own learning stats" ON user_learning_stats
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can insert their own learning stats" ON user_learning_stats
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update their own learning stats" ON user_learning_stats
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true));

-- 트리거 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_user_weak_problems_updated_at 
    BEFORE UPDATE ON user_weak_problems 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_learning_stats_updated_at 
    BEFORE UPDATE ON user_learning_stats 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 통계 업데이트 함수
CREATE OR REPLACE FUNCTION update_user_learning_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_learning_stats (
        user_id,
        total_sessions,
        total_studied,
        total_correct,
        total_duration_sec,
        average_accuracy,
        last_study_date
    )
    SELECT 
        NEW.user_id,
        COUNT(*),
        SUM(studied),
        SUM(correct),
        SUM(duration_sec),
        CASE 
            WHEN SUM(studied) > 0 THEN ROUND((SUM(correct)::DECIMAL / SUM(studied)::DECIMAL) * 100, 2)
            ELSE 0
        END,
        MAX(session_at::DATE)
    FROM user_learning_history 
    WHERE user_id = NEW.user_id
    ON CONFLICT (user_id) DO UPDATE SET
        total_sessions = EXCLUDED.total_sessions,
        total_studied = EXCLUDED.total_studied,
        total_correct = EXCLUDED.total_correct,
        total_duration_sec = EXCLUDED.total_duration_sec,
        average_accuracy = EXCLUDED.average_accuracy,
        last_study_date = EXCLUDED.last_study_date,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 학습이력 추가 시 통계 자동 업데이트
CREATE TRIGGER update_learning_stats_on_history_insert
    AFTER INSERT ON user_learning_history
    FOR EACH ROW EXECUTE FUNCTION update_user_learning_stats();

-- 뷰 생성: 사용자별 취약문제 요약
CREATE OR REPLACE VIEW user_weak_problems_summary AS
SELECT 
    user_id,
    COUNT(*) as total_weak_problems,
    COUNT(CASE WHEN needs_review = true THEN 1 END) as needs_review_count,
    AVG(last_score) as average_score,
    MIN(last_score) as lowest_score,
    MAX(last_score) as highest_score,
    COUNT(CASE WHEN last_score < 30 THEN 1 END) as critical_weak_count,
    COUNT(CASE WHEN last_score BETWEEN 30 AND 49 THEN 1 END) as moderate_weak_count
FROM user_weak_problems
GROUP BY user_id;

-- 뷰 생성: 사용자별 학습 진행률
CREATE OR REPLACE VIEW user_learning_progress AS
SELECT 
    h.user_id,
    h.session_at::DATE as study_date,
    COUNT(*) as sessions_count,
    SUM(h.studied) as total_studied,
    SUM(h.correct) as total_correct,
    SUM(h.duration_sec) as total_duration_sec,
    ROUND(AVG(h.accuracy), 2) as average_accuracy,
    MAX(h.session_at) as last_session_time
FROM user_learning_history h
GROUP BY h.user_id, h.session_at::DATE
ORDER BY h.user_id, h.session_at::DATE DESC;

-- 샘플 데이터 삽입 (개발용)
INSERT INTO user_learning_stats (user_id, total_sessions, total_studied, total_correct, total_duration_sec, average_accuracy, current_streak, longest_streak, last_study_date)
VALUES 
    ('demo_user_1', 0, 0, 0, 0, 0, 0, 0, NULL),
    ('demo_user_2', 0, 0, 0, 0, 0, 0, 0, NULL)
ON CONFLICT (user_id) DO NOTHING;
