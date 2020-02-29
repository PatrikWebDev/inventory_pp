const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory43.db')
const uuidv4 = require('uuid/v4');

function creation() {
    db.serialize(function () {

        db.run("CREATE TABLE IF NOT EXISTS groups ( description VARCHAR(100) NOT NULL, identifier VARCHAR(100) NOT NULL)")

        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, productdescription VARCHAR(100) NOT NULL, category_id VARCHAR (100) NOT NULL, FOREIGN KEY (category_id) REFERENCES groups (identifier))")

        db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))");

        db.run("CREATE TABLE IF NOT EXISTS inventory2 (id INTEGER PRIMARY KEY, product_id INTEGER NOT NULL, stock2 INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products (id))")
    })
}

creation()

function category(groupdescription, identifierpm) {
    db.serialize(function () {
        db.prepare('INSERT INTO groups (description, identifier) VALUES (?, ?)')
            .run(`${groupdescription}`, `${identifierpm}`)
    }
    )
};


category("Haztartas", `${uuidv4()}`)

function database(namepm, descriptionpm) {
    db.serialize(function () {
        db.all("SELECT identifier FROM groups", function (err, results) {
            let identifierid = results[0].identifier
            console.log(identifierid)
            db.prepare('INSERT INTO products(name, productdescription, category_id) VALUES (?, ?, ?)')
                .run(`${namepm}`, `${descriptionpm}`, `${identifierid}`)
        })
    })
}

database("vasalo", "vasal")


setTimeout( inventories, 3000)

function inventories() {
    db.serialize(function () {

        db.all("SELECT id FROM products", function (err, results) {
            let ertek = results[0].id
            console.log(ertek)
            db.run(`INSERT INTO inventory (product_id, stock) VALUES ("${ertek}", 18)`)

            db.run(`INSERT INTO inventory2 (product_id, stock2) VALUES (${ertek}, 18)`)
        })
    })
}


