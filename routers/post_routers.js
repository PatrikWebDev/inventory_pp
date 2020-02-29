const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventory43.db')
const uuidv4 = require('uuid/v4');

function updated (req, res){
	const {itemname, category, description } = req.body
	db.serialize(function(){
		db.run(`INSERT INTO products (name, category,description) VALUES (${itemname}, ${category}, ${description})`)
	})
	res.redirect('/products')
}

function updatedcount (req, res){
    const { itemcount, id, oldcount, oldcount2, raktar } = req.body
    let stock = "stock"
    if (raktar == "inventory2"){
        stock = "stock2"
    }
	console.log(itemcount, id, !(oldcount) || !(oldcount2))
	if(!(oldcount) || !(oldcount2)){
		db.run(`REPLACE into ${raktar} (product_id, ${stock}) VALUES(${id}, ${itemcount})`)
	}
	db.serialize(function(){
let sql = `UPDATE ${raktar} SET ${stock} = ${itemcount} WHERE id = ${id} `
console.log(sql)
		db.run(`${sql} `)
	} 
	)
	res.redirect('/stocks')
}

function changes (req,res){
	const {newname, newcategory, rowid, old_category, new_description} = req.body
	console.log(`az új név ${newname}`)
	let sqlString = `UPDATE products SET name = "${newname}" , category = "${newcategory}" , description = "${new_description}" where  rowid="${rowid}" AND  category="${old_category}"`
	console.log(sqlString)
	db.serialize(function(){
		db.run(sqlString)
	})
	res.redirect('/products')
}

function deleted (req, res){
	const {rowid} = req.body;
	db.serialize(function(){
		db.run(`DELETE FROM products WHERE  rowid = "${rowid}"`)
	})
	res.redirect('/products')
}

function newgroup (req, res){
	const { group_dep } = req.body
	db.serialize(function(){
		db.run(`INSERT INTO groups (description, identifier) VALUES ("${group_dep}", "${uuidv4()}")`)
    })
	res.redirect('/groups')
}

function groupmod (req, res){
	const { new_description, identifier} = req.body
	console.log(`az új név ${identifier}`)
	let sqlString = `UPDATE groups SET description = "${new_description}" where  identifier="${identifier}"`
	console.log(sqlString)
	db.serialize(function(){
		db.run(sqlString)
	})
	res.redirect('/groups')
}

function deletedgroup (req, res){
	const {rowid, identifier} = req.body;
	db.serialize(function(){
		db.run(`DELETE FROM groups WHERE  rowid = "${rowid}" AND identifier ="${identifier}"`)
	})
	res.redirect('/groups')
}
module.exports = {
    updated: updated,
    updatedcount: updatedcount,
    changes: changes,
    deleted: deleted,
    newgroup: newgroup,
    groupmod: groupmod,
    deletedgroup: deletedgroup,
}