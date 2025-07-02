-- Enable RLS on orders tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow public to insert orders" ON orders FOR INSERT WITH CHECK (true); -- For guest checkout

-- Order items policies
CREATE POLICY "Users can view order items for their orders" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert order items for their orders" ON order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Allow public to insert order items" ON order_items FOR INSERT WITH CHECK (true); -- For guest checkout

-- Reviews policies
CREATE POLICY "Allow public read access on approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can view their own reviews" ON reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow public to insert reviews" ON reviews FOR INSERT WITH CHECK (true); -- For guest reviews

-- Admin policies (you might want to create a specific admin role)
CREATE POLICY "Allow authenticated users to view all orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to view all order items" ON order_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
