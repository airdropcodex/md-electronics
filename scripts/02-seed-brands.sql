-- Insert brands
INSERT INTO brands (name, slug, is_active) VALUES
('Samsung', 'samsung', true),
('LG', 'lg', true),
('Whirlpool', 'whirlpool', true),
('GE', 'ge', true),
('Bosch', 'bosch', true),
('KitchenAid', 'kitchenaid', true),
('Frigidaire', 'frigidaire', true),
('Maytag', 'maytag', true),
('Sony', 'sony', true),
('Panasonic', 'panasonic', true),
('Haier', 'haier', true),
('Electrolux', 'electrolux', true)
ON CONFLICT (slug) DO NOTHING;
