-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);

-- Create policies for authenticated users (for admin functionality)
CREATE POLICY "Allow authenticated users to insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert brands" ON brands FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update brands" ON brands FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete brands" ON brands FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');
