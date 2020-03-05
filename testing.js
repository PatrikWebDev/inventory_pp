const sqlite3 = require('sqlite3').verbose();
const uuidv4 = require('uuid/v4');
const db = new sqlite3.Database('test7.db')

db.serialize(function () {

    db.run("CREATE TABLE IF NOT EXISTS groups ( description VARCHAR(100) NOT NULL, identifier VARCHAR(100) NOT NULL, subcategories VARCHAR(100) NOT NULL, scidentifier VARCHAR(100) NOT NULL)")

    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, productdescription VARCHAR(100) NOT NULL, category_id VARCHAR (100) NOT NULL, sub_categories VARCHAR(100) NOT NULL, FOREIGN KEY (category_id) REFERENCES groups (identifier))")
})



function subcategory(groupdescription){
    let identifierarr = []
    groupdescription.forEach(element => {
        let support ={
            element:element,
            id: uuidv4()
        }
        identifierarr.push(support.id)
    });
    db.serialize(function(){
        db.run(`INSERT INTO groups (description, identifier, subcategories, scidentifier) VALUES ( "kert", "75", "${groupdescription}", "${identifierarr}")`)
    })
}

subcategory(["a","b","c"])

function select(){
    
    db.serialize(function () {
        db.all("SELECT subcategories, scidentifier FROM groups", function (err, results) {
           console.log(results)
        })
    })
}

setTimeout(select, 3000)