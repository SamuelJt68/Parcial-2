
INSERT INTO roles (id, role_name, description) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin', 'Administrador del sistema con acceso total'),
    ('22222222-2222-2222-2222-222222222222', 'doctor', 'Profesional médico'),
    ('33333333-3333-3333-3333-333333333333', 'user', 'Usuario regular del sistema');

INSERT INTO users (id, email, password, name, phone, is_active) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin User', '3001234567', TRUE),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'doctor@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Doctor User', '3009876543', TRUE),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'user@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Regular User', NULL, TRUE),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'inactive@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Inactive User', NULL, FALSE);

INSERT INTO user_roles (user_id, role_id) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),  -- admin@test.com → admin
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222'),  -- doctor@test.com → doctor
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333');  -- user@test.com → user