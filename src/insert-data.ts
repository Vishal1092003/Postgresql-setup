// import { getClient } from "./utils";

// async function createEntries() {
//     const client = await getClient();
//     const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
//     const userValues = ['vishalsaw1092003gmail.com', '123456789'];

//     let response = await client.query(insertUserText, userValues);
//     const insertTodoText = 'INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id';
//     const todoValues = ['Buy groceries', 'Milk, bread, and eggs', response.rows[0].id, false];
//     await client.query(insertTodoText, todoValues);

//     console.log("Entries created!");
// }

// createEntries();


import { getClient } from "./utils";

// const client=await getClient();



async function insertData(){
    const client = await getClient();
 
    const usertext = `insert into users (email,password) values($1,$2)  returning *`;
    const uservalues=["vishal@gmail.com","123456789"];

    await client.query(usertext, uservalues);

}
insertData()
.then(()=>{
    console.log("user data is inserted successfully")
})
.catch((error)=>{
    console.log("error is ",error);
})


