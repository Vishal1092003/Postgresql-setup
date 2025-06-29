import { Client } from 'pg';

export async function getClient() {
    const uri ="postgres://wzsxsnxg:LHZ9Cv4QoZ1zctxapkOq2ch672-o9UQe@trumpet.db.elephantsql.com/wzsxsnxg";

    const client = new Client({
        host:"localhost",
        user:"postgres",
        password:"Suarsapv@123",
        port:5432,
        database:"TEST-Postgresql"
    });
    await client.connect();
    return client;
}
getClient()
.then((client)=>{
    console.log(`db connected to ${client.database} on port number ${client.database} on host ${client.host}`)
})
.catch((error)=>{
  console.log("error while connecting to the db ",error);
})