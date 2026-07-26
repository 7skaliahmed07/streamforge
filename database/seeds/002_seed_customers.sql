INSERT INTO customers
(first_name, last_name, email, phone)
VALUES

('John', 'Smith', 'john.smith@email.com', '111111111'),

('Sarah', 'Williams', 'sarah.williams@email.com', '222222222'),

('David', 'Brown', 'david.brown@email.com', '333333333')

ON CONFLICT (email) DO NOTHING;