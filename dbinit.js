const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventoryJ.db')
const uuidv4 = require('uuid/v4');
function creation() {
    db.serialize(function () {

        db.run("CREATE TABLE IF NOT EXISTS groups ( description VARCHAR(100) NOT NULL, identifier VARCHAR(100) NOT NULL, subcategories VARCHAR(100) NOT NULL, scidentifier VARCHAR(100) NOT NULL)")

        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, productdescription VARCHAR(100) NOT NULL, category_id VARCHAR (100) NOT NULL, sub_categories VARCHAR(100) NOT NULL, FOREIGN KEY (category_id) REFERENCES groups (identifier))")

        db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))");

        db.run("CREATE TABLE IF NOT EXISTS inventory2 (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock2 INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
    })
}

function subcategory(groupdescriptionarr, groupdescription, identifierpm){
    let identifierarr = []
    groupdescriptionarr.forEach(element => {
        let support ={
            element:element,
            id: uuidv4()
        }
        identifierarr.push(support.id)
    });
    db.serialize(function(){
        db.run(`INSERT INTO groups (description, identifier, subcategories, scidentifier) VALUES ( "${groupdescription}", "${identifierpm}", "${groupdescriptionarr}", "${identifierarr}")`)
    })
}

function database(namepm, descriptionpm) {
    db.serialize(function () {
        db.all("SELECT identifier, scidentifier FROM groups", function (err, results) {
            let identifierid = results[0].identifier
            console.log(identifierid)
            let scidentifierid = results[0].scidentifier
            console.log(scidentifierid)
            db.prepare('INSERT INTO products(name, productdescription, category_id, sub_categories) VALUES (?, ?, ?, ?)')
                .run(`${namepm}`, `${descriptionpm}`, `${identifierid}`, `${scidentifierid}`)
        })
    })
}

function inventories() {
    db.serialize(function () {

        db.all("SELECT id FROM products", function (err, results) {
           //uncommenting this and changing the results[0] to results[5]
            for(let i = 0; i < results.length; i++){
            let ertek = results[i].id
            console.log(ertek)
            db.run(`INSERT INTO inventory (product_id, stock) VALUES ("${ertek}", 18)`)

            db.run(`INSERT INTO inventory2 (product_id, stock2) VALUES (${ertek}, 18)`)
        }
        })
    })
}

module.exports = {
    creation: creation,
    database: database,
    inventories: inventories,
    subcategory: subcategory
}
