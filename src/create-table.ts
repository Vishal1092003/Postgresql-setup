// import { getClient } from "./utils";

// async function createTable() {
//     const createUserTableQuery = `
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         );
//     `;

//     const client = await getClient();

//     await client.query(createUserTableQuery);

//     const createTodosQuery = `
//         CREATE TABLE todos (
//             id SERIAL PRIMARY KEY,
//             title TEXT NOT NULL,
//             description TEXT,
//             user_id INTEGER REFERENCES users(id),
//             done BOOLEAN DEFAULT FALSE
//         );
//     `;


//     await client.query(createTodosQuery);

//     console.log("Table created successfully!");
// }



// createTable();


import { getClient } from "./utils";

async function createTable(){
    const createUserTableQuery=`
     create table IF NOT EXISTS users(
      id       serial primary key,
      email    varchar(255) not null,
      password varchar(255)  not null
    )
    `
    const client=await getClient();

    await client.query(createUserTableQuery);
    console.log("Users Table create successfully")

    const createTodosQuery=`
    create table if not exists todos(
       id          serial primary key,
     title       text not null,
     description  text,
     user_id       integer references users(id),
     done     boolean default false
    )
    
    `
    await client.query(createTodosQuery);

  console.log("Todos Table create successfully");
}

createTable();
