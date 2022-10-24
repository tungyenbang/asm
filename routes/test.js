const pg_conn = require('../model/database.js');

async function test_query(){

    const query = {
      text: 'SELECT * FROM product where shop = $1',
      values: ["1"]
      }
      query_data = await pg_conn.query(query);  
      console.log(query_data);
      return query;
}
results = test_query();
console.log(results);