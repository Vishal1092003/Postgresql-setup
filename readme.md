# PostgreSQL + TypeScript Project Setup

This covers how to set up a Node.js project using TypeScript and the `pg` library for PostgreSQL, how to compile your `.ts` files into a `dist/` folder, and how to run your compiled code.

---

## Prerequisites

1. **Node.js & npm** (v14+ recommended)
2. **PostgreSQL** server running locally (default port `5432`)
3. **psql** CLI for interacting with your database
4. **TypeScript** installed globally (optional) or locally

---

## 1. Install Dependencies

From your project root:

```bash
npm init -y
npm install pg
npm install --save-dev typescript @types/pg
```

* `pg`: PostgreSQL client for Node.js
* `typescript`: TS compiler
* `@types/pg`: TypeScript declarations for `pg`

---

## 2. Configure TypeScript

Create a `tsconfig.json` in your project root:

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

* **`rootDir`**: Where your `.ts` files live (e.g. `src/`)
* **`outDir`**: Where compiled `.js` files will go (e.g. `dist/`)

---

## 3. Project Structure

````
project-root/
├── dist/                # compiled JavaScript output
├── node_modules/        # dependencies
├── src/                 # TypeScript source files
│   ├── joins/           # SQL join helper scripts (if any)
│   ├── create-index.ts  # create index script
│   ├── create-table.ts  # create tables script
│   ├── delete-data.ts   # delete data script
│   ├── get-data.ts      # read data script
│   ├── insert-data.ts   # insert data script
│   ├── update-data.ts   # update data script
│   └── utils.ts         # database connection helper
├── .gitignore
├── package.json
├── package-lock.json    # or yarn.lock
└── tsconfig.json
---

## 4. NPM Scripts

In `package.json`, update the `scripts` section:

```jsonc
"scripts": {
  "build": "tsc",
  "start": "node dist/create-table.js"
}
````

* **`npm run build`**: compiles all `.ts` files into `dist/`
* **`npm start`**: runs your compiled script

---

## 5. Build and Run

1. **Compile** your TypeScript:

   ```bash
   npm run build
   ```
2. **Run** the compiled code:

   ```bash
   npm start
   ```

> If you change any `.ts` file, re-run `npm run build` before `npm start`.

---

## 6. Direct TS Execution (Optional)

To skip the manual compile step, install `ts-node`:

```bash
npm install --save-dev ts-node
```

Then add a `dev` script:

```jsonc
"scripts": {
  "dev": "ts-node src/create-table.ts"
}
```

---

## 7. PostgreSQL & psql Usage

* **Connect** to your database with psql:

  ```bash
  psql -h localhost -U postgres -d "Test-Postgresql"
  ```
* **List tables**:

  ```sql
  \dt
  ```
* **Drop a table** (with dependent objects):

  ```sql
  DROP TABLE IF EXISTS users CASCADE;
  ```

---

## 8. Troubleshooting

* **Authentication error** (`28P01`):

  * Verify role and password in Postgres:

    ```sql
    ALTER ROLE "S2Buckets" WITH PASSWORD 'Suarsapv@123';
    ```
  * Ensure `pg_hba.conf` allows `md5` auth for your user.
  * Test with psql manually:

    ```bash
    psql -h localhost -U S2Buckets -d "Test-Postgresql"
    ```

* **Syntax errors** in SQL:

  * Use commas, not semicolons, between column definitions.
  * Terminate statements with `;` after the `)`.

---
# SQL Cheat Sheet for Users Table

## \*\* save from sql injection

```js
const client = await getClient();
const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
const userValues = ['john.do11e@gmail2.com', 'hashed_password_here'];

let response = await client.query(insertUserText, userValues);
```

## \*\* The problem here is that there’s no such thing as an INSERT … IF EXISTS statement in PostgreSQL (or most SQL dialects). IF EXISTS only shows up in things like DROP TABLE IF EXISTS or CREATE EXTENSION IF NOT EXISTS, not in INSERT.

## What you probably want

1. A plain insert
   If you just want to insert every time (and let the database complain on duplicates), do:

```js
const userText = `
  INSERT INTO users (email, password)
  VALUES ($1, $2)
  RETURNING *;
`;
const userValues = ['rohit9264@gmail.com', '123456789'];
```

2. “Insert only if that email isn’t already there”
   Use an upsert (INSERT … ON CONFLICT) or a conditional INSERT … SELECT:

### a) Upsert that does nothing on conflict

```js
const userText = `
  INSERT INTO users (email, password)
  VALUES ($1, $2)
  ON CONFLICT (email) DO NOTHING
  RETURNING *;
`;
```

This will insert a new row if email isn’t already in the table; if it is, it simply does nothing (no error) and returns an empty result set.

### b) Conditional insert with WHERE NOT EXISTS

```js
const userText = `
  INSERT INTO users (email, password)
  SELECT $1, $2
  WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = $1
  )
  RETURNING *;
`;
```

This does the same “only insert if no row with that email exists” but works even if you haven’t declared a unique constraint on email.

## QUERY 1:

i want to perform the sql query like if i more than one email id has frequency >1 then i want to remove all thedulpicates just keep only one user id

```sql
delete from users 
where id not in (
select min(id)
from users
group by email
)
```

Happy coding! 🚀

