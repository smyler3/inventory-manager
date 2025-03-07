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
    category_id INTEGER REFERENCES categories(id),
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
    ('Entertainment', 'Movies, music, games, and pop culture discussions.');

INSERT INTO products (category_id, title, description, sale_price, stock_count, low_stock_count, critical_stock_count)
VALUES 
    (1, 'Smartphone XYZ', 'A cutting-edge smartphone with a 6.7-inch display, powerful camera, and fast processor.', 799.99, 200, 10, 5),
    (1, 'Laptop ABC', 'A lightweight laptop with a 15-inch screen, perfect for work or play.', 1200.00, 50, 10, 3),
    (2, 'Yoga Mat', 'Non-slip yoga mat for comfortable exercise and relaxation sessions.', 29.99, 300, 20, 5),
    (2, 'Protein Powder', 'High-quality protein powder to support muscle recovery and growth.', 49.99, 150, 10, 3),
    (3, 'Bluetooth Headphones', 'Wireless Bluetooth headphones with noise-cancellation features.', 199.99, 100, 15, 5),
    (3, 'Gaming Console', 'Next-gen gaming console with a wide range of game titles and online capabilities.', 499.99, 75, 10, 2);
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