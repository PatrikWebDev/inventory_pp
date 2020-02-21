const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory.db')
 
function database(namepm, categorypm){
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, category VARCHAR(60) NOT NULL)")
     
        db.prepare('INSERT INTO products(name, category) VALUES (?, ?)')
            .run(`${namepm}`, `${categorypm}`)
    
    
    
db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
     
        db.run('INSERT INTO inventory(product_id, stock) VALUES (1, 18)')
    
    
    });

}

database("vasalo", "haztartas")