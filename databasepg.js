const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "enlab"
})

client.connect();

client.query(`Select * from employee`, (err, res) => {
    if(!err){
        console.log(res.rows)
    } else {
        console.log(err.message)
    }
    client.end
})