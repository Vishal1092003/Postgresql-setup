
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
    await client.query(
        `
        alter table users
        add constraint user_table_email_unique  unique(email)
        `
    );

    await client.query(createUserTableQuery);
    console.log("Users Table create successfully")

    const createTodosQuery=`
    create table if not exists todos(
       id         serial primary key,
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
