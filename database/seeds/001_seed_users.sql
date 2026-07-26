INSERT INTO users
(username, email, password_hash, role)
VALUES
(
    'admin',
    'admin@streamforge.com',
    'hashed_password',
    'admin'
)
ON CONFLICT (email) DO NOTHING;