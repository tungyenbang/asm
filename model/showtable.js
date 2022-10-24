const pg_conn = require('./database');
async function viewTable(shopId){
    const query_table = {
        text: 'select * from product WHERE shop =$1',
        values: [shopId]
    }
    var query_data = await pg_conn.query(query_table);
    var TableString = `  <table border=1>
                        <tr>`;
    let num_fields = query_data.fields.length;
    let num_rows = query_data.num_rows;
    const list_fields=[];
    for(let i =0; i<num_fields; i++){
        let field_name = query_data.fields[i].name;
        list_fields.push(field_name);
        TableString += `<th>${field_name}</th>`
    }
    TableString += `</tr>`;

    for(let i = 0; i<num_rows; i++){
        TableString += '<tr>';
        TableString += `<td>${query_data.rows[i].fields[0]} </td>`
        TableString += `<td>${query_data.rows[i].fields[1]} </td>`
        TableString += `<td>${query_data.rows[i].fields[2]} </td>`
        TableString += `<td>${query_data.rows[i].fields[3]} </td>`
        TableString += '</tr>';
         }
         TableString += `</table>`;
         return TableString;
    }

    module.exports = viewTable;