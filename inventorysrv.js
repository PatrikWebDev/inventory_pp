const express = require('express');

const path = require('path');
const hbs = require('express-handlebars');
const uuidv4 = require('uuid/v4');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory4.db')
const PORT = 3000;
const app = express();
app.use(express.json());
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded())


const items = [];
const inventory = [];
const groups = [];
let categories =[];


function categorising(){
    db.serialize(function() {
		db.all("SELECT description, rowid FROM groups", function(err, results) {
			console.log(results)
		categories = results
	})
	  })};
	  
categorising()
console.log(categories)


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
	res.redirect('/products')
})

app.get('/products', (req, res) => {
    db.serialize(function() {
        db.all("SELECT id, name, category, description from products", function(err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
			items.push(results)
			console.log(results, categories)
          res.render('home', {items:results, categories} )
            
        });
      });

})

app.get('/stocks', (req, res)=>{
	db.serialize(function() {
        db.all("SELECT products.id, products.name, products.category, inventory.stock FROM products JOIN inventory ON products.id = inventory.product_id", function(err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
			inventory.push(results)
			console.log(results)
          	res.render('inventory_page', {inventory:results})
            
        });
      });
})

app.post('/updated', (req, res)=>{
	const {itemname, category, description } = req.body
	db.serialize(function(){

		db.prepare('INSERT INTO products (name, category,description) VALUES ( ?, ?, ?)')
            .run(`${itemname}`, `${category}`, `${description}`)
	}
	)
	res.redirect('/products')
})

app.post('/updatedcount', (req, res)=>{
	const { itemcount, id } = req.body
	console.log(itemcount, id)
	db.serialize(function(){

		db.prepare(`UPDATE inventory SET stock = "${itemcount}"WHERE product_id = "${id}" `)
            .run(`${itemcount}`, `${id}`)
	} 
	)
	res.redirect('/stocks')
})

app.post('/changes', (req,res)=>{
	const {newname, newcategory, rowid, old_category, new_description} = req.body
	console.log(`az új név ${newname}`)
	let sqlString = `UPDATE products SET name = "${newname}" , category = "${newcategory}" , description = "${new_description}" where  rowid="${rowid}" AND  category="${old_category}"`
	console.log(sqlString)
	db.serialize(function(){
		db.run(sqlString)
	})
	res.redirect('/products')
})

app.post('/deleted', (req, res)=>{
	const {rowid} = req.body;
	db.serialize(function(){
		db.run(`DELETE FROM products WHERE  rowid = "${rowid}"`)
	})
	res.redirect('/products')
})

app.get('/groups',(req, res)=>{
	db.serialize(function() {
        db.all("SELECT rowid, description, identifier from groups", function(err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
			groups.push(results)
			console.log(results)
          res.render('groups_page', {groups:results})
            
        });
      });
})

app.post('/newgroup', (req, res)=>{
	const { group_dep } = req.body
	db.serialize(function(){

		db.prepare('INSERT INTO groups VALUES (?, ?)')
            .run(`${group_dep}`, `${uuidv4()}`)
	}
	)
	res.redirect('/groups')
})

app.post('/groupmod', (req, res)=>{
	const { new_description, identifier} = req.body
	console.log(`az új név ${identifier}`)
	let sqlString = `UPDATE groups SET description = "${new_description}" where  identifier="${identifier}"`
	console.log(sqlString)
	db.serialize(function(){
		db.run(sqlString)
	})
	res.redirect('/groups')
})

app.post('/deletedgroup', (req, res)=>{
	const {rowid, identifier} = req.body;
	db.serialize(function(){
		db.run(`DELETE FROM groups WHERE  rowid = "${rowid}" AND identifier ="${identifier}"`)
	})
	res.redirect('/groups')
})

app.listen(PORT, () => console.log(`App is started and listening on port ${PORT}`));




db.serialize(function(){
	db.run(`DELETE FROM products WHERE  name = "vasalo"`);
})