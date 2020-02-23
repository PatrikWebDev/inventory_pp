const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory4.db')
const uuidv4 = require('uuid/v4');

function database(namepm, categorypm, descriptionpm, groupdescription, identifierpm ){
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, category VARCHAR(60) NOT NULL, description VARCHAR(100) NOT NULL)")
     
        db.prepare('INSERT INTO products(name, category, description) VALUES (?, ?, ?)')
            .run(`${namepm}`, `${categorypm}`, `${descriptionpm}`)
    
    
    
db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
     
        db.run('INSERT INTO inventory(product_id, stock) VALUES (4, 18)')
    
db.run("CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, description VARCHAR(100) NOT NULL, identifier VARCHAR(100) NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
     
        db.prepare('INSERT INTO groups (product_id, description, identifier) VALUES (4, ?, ?)')
            .run(`${groupdescription}` ,`${identifierpm}`)

    })
    };

database("vasalo", "haztartas", "vasal", "telefonok", uuidv4())


