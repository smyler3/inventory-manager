# Bits n Bobs
A clean and reliable inventory manager that organizes products into categories, tracks stock levels, flags low inventory, and stores pricing and product details.

***Built using: HTML, CSS, Node, PostgreSQL, and Express***

[Link to project](https://bitsnbobs.talymmyler.com/)

## How to run
> ***Note:*** This app requires a PostgreSQL (psql) database by default. You can modify the code to support a different database engine if needed.
1. Clone the repo
```bash
git clone https://github.com/smyler3/inventory-manager.git
cd inventory-manager
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory with your Postgres credentials and a secret key:
```bash
PG_HOST=your-host
PG_USER=your-user
PG_DATABASE=your-db
PG_PASSWORD=your-password
PG_PORT=your-port
SECRET_KEY=your-secret
```

4. (Optional) Seed the database
```bash
npm run seed
```
5. Start the app
```bash
npm run dev
```
