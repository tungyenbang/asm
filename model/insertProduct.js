const pg_conn = require('./database');
async function insertProduct(id,name,quantity,price) {
    const query = {
        text: `insert into product(id,name,quantity,price) values($1,$2,$3,$4)`,
        values: [id,name,price,quantity]
    }
    var query_data = await pg_conn.query(query);
    console.log(query_data);
}
module.exports = insertProduct;