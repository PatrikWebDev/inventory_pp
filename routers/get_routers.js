const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory43.db')

const items = [];
const groupsarray = [];
let categories = [];


function categorising() {
    db.serialize(function () {
        db.all("SELECT description, identifier from groups", function (err, results) {
            console.log("categorising :", results)
            categories = results
        })
    })
    return categories
};

categorising()

function products(req, res) {
    db.serialize(function () {
        db.all("SELECT id, name, productdescription, groups.description from products LEFT JOIN groups ON products.category_id = groups.identifier", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            console.log("items:", results)
            res.render('home', { items: results, categories: categorising })

        });
    });

}

function stocks(req, res) {
    db.serialize(function () {
        db.all("SELECT products.id, products.name, inventory.stock, inventory2.stock2 FROM products Left JOIN inventory Left JOIN inventory2 ON products.id = inventory.product_id", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            console.log(results)
            res.render('inventory_page', { inventory: results, categories: categorising })
        });
    });
}

function groups(req, res) {
    db.serialize(function () {
        db.all("SELECT description, identifier, products.id from groups LEFT JOIN products ON products.category_id = groups.identifier", function (err, results) {
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