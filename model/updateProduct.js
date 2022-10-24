const pg_conn = require('./database');
async function updateProduct(id,name,quantity,price) {
    const query = {
        text: `update product set id = $1, name = $2, price = $3, quantity = $4 where id = $5`,
        values: [id,name,price,quantity,id]
    }
    var query_data = await pg_conn.query(query);
    console.log(query_data);
}
module.exports = updateProduct;