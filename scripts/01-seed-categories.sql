-- Insert categories
INSERT INTO categories (name, slug, description, is_active) VALUES
('Refrigerators', 'refrigerators', 'Keep your food fresh with our range of energy-efficient refrigerators', true),
('Ovens', 'ovens', 'Professional-grade ovens for all your cooking needs', true),
('Televisions', 'televisions', 'Experience entertainment like never before with our smart TVs', true),
('Air Conditioners', 'air-conditioners', 'Stay cool and comfortable with our efficient air conditioning units', true),
('Washing Machines', 'washing-machines', 'Advanced washing machines for all your laundry needs', true),
('Deep Freezers', 'deep-freezers', 'Extra storage space for your frozen goods', true)
ON CONFLICT (slug) DO NOTHING;
