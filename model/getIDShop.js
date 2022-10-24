const pg_conn = require('./database');
async function getIDSHop(username, password){
    const queryID = {
        text: 'SELECT shop from users where name = $1 AND passwd = $2',
        values: [username, password]
    }
    var query_data = await pg_conn.query(queryID);
    console.log(query_data.rows[0].shop);
    return query_data.rows[0].shop;
}
module.exports = getIDSHop;