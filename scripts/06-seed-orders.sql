-- Insert sample orders
INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, billing_address, total_amount, status, payment_status, payment_method) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0123', 
 '{"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}',
 '{"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}',
 1299.99, 'delivered', 'paid', 'credit_card'),

('Sarah Johnson', 'sarah.johnson@email.com', '+1-555-0124',
 '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zip": "90210", "country": "USA"}',
 '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zip": "90210", "country": "USA"}',
 899.99, 'shipped', 'paid', 'paypal'),

('Mike Davis', 'mike.davis@email.com', '+1-555-0125',
 '{"street": "789 Pine Rd", "city": "Chicago", "state": "IL", "zip": "60601", "country": "USA"}',
 '{"street": "789 Pine Rd", "city": "Chicago", "state": "IL", "zip": "60601", "country": "USA"}',
 1799.98, 'processing', 'paid', 'credit_card'),

('Emily Wilson', 'emily.wilson@email.com', '+1-555-0126',
 '{"street": "321 Elm St", "city": "Houston", "state": "TX", "zip": "77001", "country": "USA"}',
 '{"street": "321 Elm St", "city": "Houston", "state": "TX", "zip": "77001", "country": "USA"}',
 549.99, 'pending', 'pending', 'bank_transfer'),

('David Brown', 'david.brown@email.com', '+1-555-0127',
 '{"street": "654 Maple Dr", "city": "Phoenix", "state": "AZ", "zip": "85001", "country": "USA"}',
 '{"street": "654 Maple Dr", "city": "Phoenix", "state": "AZ", "zip": "85001", "country": "USA"}',
 2299.97, 'completed', 'paid', 'credit_card');

-- Insert sample order items (you'll need to get actual product IDs)
DO $$
DECLARE
    order_1_id UUID;
    order_2_id UUID;
    order_3_id UUID;
    order_4_id UUID;
    order_5_id UUID;
    samsung_fridge_id UUID;
    bosch_oven_id UUID;
    samsung_tv_id UUID;
    lg_washer_id UUID;
    whirlpool_washer_id UUID;
    sony_tv_id UUID;
BEGIN
    -- Get order IDs
    SELECT id INTO order_1_id FROM orders WHERE customer_email = 'john.smith@email.com';
    SELECT id INTO order_2_id FROM orders WHERE customer_email = 'sarah.johnson@email.com';
    SELECT id INTO order_3_id FROM orders WHERE customer_email = 'mike.davis@email.com';
    SELECT id INTO order_4_id FROM orders WHERE customer_email = 'emily.wilson@email.com';
    SELECT id INTO order_5_id FROM orders WHERE customer_email = 'david.brown@email.com';
    
    -- Get product IDs
    SELECT id INTO samsung_fridge_id FROM products WHERE slug = 'samsung-french-door-refrigerator-28-cu-ft';
    SELECT id INTO bosch_oven_id FROM products WHERE slug = 'bosch-built-in-electric-oven-30';
    SELECT id INTO samsung_tv_id FROM products WHERE slug = 'samsung-65-qled-4k-smart-tv';
    SELECT id INTO lg_washer_id FROM products WHERE slug = 'lg-front-load-washer-4-5-cu-ft';
    SELECT id INTO whirlpool_washer_id FROM products WHERE slug = 'whirlpool-top-load-washer-4-3-cu-ft';
    SELECT id INTO sony_tv_id FROM products WHERE slug = 'sony-75-led-4k-smart-tv';
    
    -- Insert order items
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
    (order_1_id, samsung_fridge_id, 1, 1299.99, 1299.99),
    (order_2_id, bosch_oven_id, 1, 899.99, 899.99),
    (order_3_id, samsung_tv_id, 1, 1499.99, 1499.99),
    (order_3_id, lg_washer_id, 1, 299.99, 299.99),
    (order_4_id, whirlpool_washer_id, 1, 549.99, 549.99),
    (order_5_id, sony_tv_id, 1, 1799.99, 1799.99),
    (order_5_id, bosch_oven_id, 1, 499.99, 499.99);
END $$;
