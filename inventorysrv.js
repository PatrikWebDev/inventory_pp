const express = require('express');

const path = require('path');
const hbs = require('express-handlebars');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory.db')
const PORT = 3000;
const app = express();
app.use(express.json());
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded())

const items = [];
const inventory = []

app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', (req, res) => {
	res.render('home', { items});
});*/

app.get('/', (req, res)=>{
	res.redirect('/products')
})

app.get('/products', (req, res) => {
    db.serialize(function() {
        db.all("SELECT rowid, name, category from products", function(err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
			items.push(results)
			console.log(results)
          res.render('home', {items:results})
            
        });
      });

})

app.get('/stocks', (req, res)=>{
	db.serialize(function() {
        db.all("SELECT products.id, products.name, products.category, inventory.stock FROM products JOIN inventory ON products.id = inventory.product_id", function(err, results) {
           /* if (err != null) {
                res.send("Missing from database")
            }*/
			inventory.push(results)
			console.log(results)
          	res.render('inventory_page', {inventory:results})
            
        });
      });
})

app.post('/updated', (req, res)=>{
	const {itemname, category } = req.body
	db.serialize(function(){

		db.prepare('INSERT INTO products VALUES (?, ?)')
            .run(`${itemname}`, `${category}`)
	}
	)
	res.redirect('/products')
})

app.post('/updatedcount', (req, res)=>{
	const { itemcount, prod_name } = req.body
	console.log(itemcount, prod_name)
	db.serialize(function(){

		db.prepare(`UPDATE inventory SET count = ${itemcount} WHERE prod_name = ${prod_name}`)
            .run(`${itemcount}`, `${prod_name}`)
	}
	)
	res.redirect('/stocks')
})

app.listen(PORT, () => console.log(`App is started and listening on port ${PORT}`));
