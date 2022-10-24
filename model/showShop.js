const pg_conn = require('./database');
async function viewShop(shopId) {
    var arrShop = [];
    const shop_query = {
        text: 'SELECT * from shop where id = $1',
        values: [shopId]
    }
    var query_data = await pg_conn.query(shop_query)
    arrShop.push(query_data.rowCount, query_data.rows);
    return arrShop;
}
module.exports = viewShop;