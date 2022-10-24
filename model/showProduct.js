const pg_conn = require('./database');
async function viewProduct(shopId) {
   
    const shop_query = {
        text: 'SELECT * FROM product WHERE shop =$1',
        values: [shopId]
    }
    var query_data = await pg_conn.query(shop_query)
    console.log(query_data.rows);
    return query_data.rows;
}

module.exports = viewProduct;