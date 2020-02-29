const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory4.db')

const items = [];
const groupsarray = [];
let categories = [];


function categorising() {
    db.serialize(function () {
        db.all("SELECT description, id FROM groups", function (err, results) {
            console.log("categorising :", results)
            categories = results
        })
    })
    return categories
};

categorising()

function products(req, res) {
    db.serialize(function () {
        db.all("SELECT id, name, category, description from products", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            console.log(results, categories)
            res.render('home', { items: results, categories: categorising })

        });
    });

}

function stocks(req, res) {
    db.serialize(function () {
        db.all("SELECT products.id, products.name, products.category, inventory.stock FROM products Left JOIN inventory ON products.id = inventory.product_id", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            console.log(results)
            res.render('inventory_page', { inventory: results })
        });
    });
}

function groups(req, res) {
    db.serialize(function () {
        db.all("SELECT rowid, description, identifier from groups", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            console.log(results)
            res.render('groups_page', { groupsarray: results })

        });
    });
}

module.exports = {
    products: products,
    stocks: stocks,
    groups: groups,
}