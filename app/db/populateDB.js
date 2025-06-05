const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 256 ) NOT NULL UNIQUE,
    description VARCHAR ( 1024 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR ( 256 ) NOT NULL UNIQUE,
    description VARCHAR ( 1024 ) NOT NULL,
    sale_price DECIMAL NOT NULL CHECK (sale_price >= 0 AND sale_price <= 1000000),
    stock_count INTEGER NOT NULL CHECK (stock_count >= 0 AND stock_count <= 1000000),
    low_stock_count INTEGER NOT NULL CHECK (low_stock_count >= 0 AND low_stock_count <= 1000000),
    critical_stock_count INTEGER NOT NULL CHECK (critical_stock_count >= 0 AND critical_stock_count <= low_stock_count)
);

INSERT INTO categories (title, description)
VALUES 
    ('Technology', 'All things related to technology, including gadgets, software, and AI.'),
    ('Health & Wellness', 'Topics on physical and mental health, fitness, and nutrition.'),
    ('Entertainment', 'Movies, music, games, and pop culture discussions.'),
    ('Home & Kitchen', 'Appliances, cookware, and essentials for home living.'),
    ('Books', 'Fiction, non-fiction, educational, and self-help books.'),
    ('Sports & Outdoors', 'Gear and accessories for sports, fitness, and outdoor adventures.');

INSERT INTO products (category_id, title, description, sale_price, stock_count, low_stock_count, critical_stock_count)
VALUES 
    (1, 'Smartphone', 'A cutting-edge smartphone with a 6.7-inch display, powerful camera, and fast processor.', 799.50, 12, 15, 5),
    (1, 'Laptop', 'A lightweight laptop with a 15-inch screen, perfect for work or play.', 1205.00, 46, 10, 3),
    (1, 'Wireless Mouse', 'Ergonomic wireless mouse with long battery life.', 23.75, 279, 25, 7),
    (1, 'Mechanical Keyboard', 'RGB-backlit mechanical keyboard with customizable keys.', 89.00, 109, 20, 8),
    (1, 'Smartwatch GT', 'Fitness tracking smartwatch with heart rate monitor and GPS.', 198.45, 7, 10, 4),
    (2, 'Yoga Mat', 'Non-slip yoga mat for comfortable exercise and relaxation sessions.', 28.95, 281, 25, 6),
    (2, 'Protein Powder', 'High-quality protein powder to support muscle recovery and growth.', 52.00, 143, 12, 4),
    (2, 'Resistance Bands', 'Set of resistance bands for strength training at home.', 18.50, 172, 18, 6),
    (2, 'Massage Gun', 'Deep tissue massage gun for muscle relaxation.', 127.00, 2, 10, 3),
    (2, 'Water Bottle', 'BPA-free reusable water bottle with time markers.', 13.49, 239, 30, 10),
    (3, 'Bluetooth Headphones', 'Wireless Bluetooth headphones with noise-cancellation features.', 194.25, 94, 15, 5),
    (3, 'Gaming Console', 'Next-gen gaming console with a wide range of game titles and online capabilities.', 502.00, 69, 10, 3),
    (3, 'Streaming Subscription', '12-month access to premium streaming content.', 120.00, 489, 50, 20),
    (3, 'Board Game Set', 'Classic and modern board games in one box.', 41.75, 187, 25, 9),
    (3, 'Vinyl Record Player', 'Vintage-style record player with built-in speakers.', 92.10, 88, 12, 4),
    (4, 'Air Fryer Pro', 'Efficient air fryer with digital controls and easy cleanup.', 88.80, 113, 15, 5),
    (4, 'Stainless Steel Cookware Set', 'Durable 10-piece cookware set for all your cooking needs.', 161.95, 81, 10, 3),
    (4, 'Blender Max', 'High-speed blender for smoothies, soups, and sauces.', 101.00, 141, 22, 7),
    (4, 'Robot Vacuum', 'Automatic robot vacuum with scheduling and smart sensors.', 247.45, 59, 8, 2),
    (4, 'Electric Kettle', 'Fast-boiling electric kettle with temperature control.', 38.50, 197, 25, 10),
    (5, 'Thriller Novel - Dark Chase', 'A gripping thriller novel with twists and turns.', 14.00, 34, 25, 10),
    (5, 'Productivity Planner', 'Daily planner designed to boost productivity and focus.', 20.50, 143, 20, 6),
    (5, 'Science Fiction - Galaxy Rift', 'An epic journey across the stars and beyond.', 18.75, 92, 12, 4),
    (5, 'Self-Help - Mind Reset', 'Guide to transforming mindset and achieving goals.', 21.40, 167, 20, 5),
    (5, 'Cookbook - Fast Meals', 'Easy and quick recipes for everyday cooking.', 26.00, 127, 15, 5),
    (6, 'Camping Tent 4-Person', 'Weather-resistant tent suitable for up to four people.', 128.00, 62, 8, 2),
    (6, 'Mountain Bike Helmet', 'Lightweight helmet with enhanced ventilation and safety.', 58.90, 86, 12, 5),
    (6, 'Hiking Backpack', 'Durable backpack with hydration compatibility.', 78.25, 69, 10, 3),
    (6, 'Fitness Tracker Band', 'Tracks steps, calories, and heart rate.', 48.60, 105, 15, 5),
    (6, 'Resistance Parachute', 'Training parachute for sprint resistance workouts.', 35.00, 138, 20, 5);
`;

async function main () {
    console.log("Seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
    });
    
    try {
        await client.connect();
        await client.query(SQL);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await client.end();
    }
    
    console.log("Done");
};

main();