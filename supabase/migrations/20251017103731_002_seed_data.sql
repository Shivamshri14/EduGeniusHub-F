-- Insert software tools
INSERT INTO software (name, description, is_active) VALUES
('Netflix', 'Premium streaming service with movies, TV shows, and documentaries', true),
('Perplexity', 'AI-powered search engine and research assistant', true),
('DeepSeek', 'Advanced AI model for coding and analysis', true),
('ChatGPT', 'OpenAI ChatGPT Plus with GPT-4 access', true),
('QuillBot', 'AI-powered paraphrasing and writing assistant', true),
('Grammarly', 'Writing enhancement and grammar checking tool', true),
('Turnitin', 'Plagiarism detection and academic integrity tool', true)
ON CONFLICT DO NOTHING;

-- Insert plans for Netflix
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'Netflix Private Plan', 1
FROM software WHERE name = 'Netflix'
ON CONFLICT DO NOTHING;

INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'shared', 'Netflix Shared Plan (4 screens)', 4
FROM software WHERE name = 'Netflix'
ON CONFLICT DO NOTHING;

-- Insert plans for Perplexity
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'Perplexity Pro Private', 1
FROM software WHERE name = 'Perplexity'
ON CONFLICT DO NOTHING;

INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'shared', 'Perplexity Pro Shared (2 users)', 2
FROM software WHERE name = 'Perplexity'
ON CONFLICT DO NOTHING;

-- Insert plans for DeepSeek
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'DeepSeek Private Access', 1
FROM software WHERE name = 'DeepSeek'
ON CONFLICT DO NOTHING;

INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'shared', 'DeepSeek Shared Access (3 users)', 3
FROM software WHERE name = 'DeepSeek'
ON CONFLICT DO NOTHING;

-- Insert plans for ChatGPT
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'ChatGPT Plus Private', 1
FROM software WHERE name = 'ChatGPT'
ON CONFLICT DO NOTHING;

-- Insert plans for QuillBot
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'QuillBot Premium Private', 1
FROM software WHERE name = 'QuillBot'
ON CONFLICT DO NOTHING;

INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'shared', 'QuillBot Premium Shared (2 users)', 2
FROM software WHERE name = 'QuillBot'
ON CONFLICT DO NOTHING;

-- Insert plans for Grammarly
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'Grammarly Premium Private', 1
FROM software WHERE name = 'Grammarly'
ON CONFLICT DO NOTHING;

INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'shared', 'Grammarly Premium Shared (2 users)', 2
FROM software WHERE name = 'Grammarly'
ON CONFLICT DO NOTHING;

-- Insert plans for Turnitin
INSERT INTO plans (software_id, plan_type, display_name, max_seats)
SELECT id, 'private', 'Turnitin Private Access', 1
FROM software WHERE name = 'Turnitin'
ON CONFLICT DO NOTHING;