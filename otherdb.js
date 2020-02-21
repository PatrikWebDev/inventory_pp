const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('otherdb.db')
 
function database(id, prod_name, count){
    db.serialize(function() {
        db.run("CREATE TABLE inventory ( id VARCHAR(100), prod_name VARCHAR(60), count VARCHAR(60))")
     
        db.prepare('INSERT INTO inventory VALUES (?, ?, ?)')
            .run(`${id}`, `${prod_name}`, `${count}`)
    
    
    });
}

database();