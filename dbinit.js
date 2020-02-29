const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory6.db')
const uuidv4 = require('uuid/v4');

function database(namepm, descriptionpm, groupdescription, identifierpm ){
    db.serialize(function() {
        
db.run("CREATE TABLE IF NOT EXISTS groups ( description VARCHAR(100) NOT NULL, identifier VARCHAR(100) NOT NULL)")
     
        db.prepare('INSERT INTO groups (description, identifier) VALUES (?, ?)')
            .run(`${groupdescription}` ,`${identifierpm}`)


            
db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, productdescription VARCHAR(100) NOT NULL, category_id VARCHAR (100) NOT NULL, FOREIGN KEY (category_id) REFERENCES groups (identifier))")
db.all("SELECT identifier FROM groups", function (err, results) {
    let identifierid = results


        db.prepare('INSERT INTO products(name, productdescription, category_id) VALUES (?, ?, ?)')
            .run(`${namepm}`, `${descriptionpm}`, `${identifierid}`)
        })    
    
    
db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
     
db.all("SELECT id FROM products", function (err, results) {
    let productid_id = results
    let ertek = productid_id[0].id
    
        db.run(`INSERT INTO inventory(product_id, stock) VALUES (${ertek}, 18)`)
    


db.run("CREATE TABLE IF NOT EXISTS inventory2 (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock2 INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")



        db.run(`INSERT INTO inventory2 (product_id, stock2) VALUES (${ertek}, 18)`)


    })
    })
    };

database("vasalo", "vasal", "Haztrtás", uuidv4())


