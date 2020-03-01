const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('inventoryF.db')
const uuidv4 = require('uuid/v4');
function waiting(){}

function updated (req, res){
	const {itemname, category, productdescription } = req.body
	db.serialize(function(){
		db.run(`INSERT INTO products (name, category_id, productdescription) VALUES ("${itemname}", "${category}", "${productdescription}")`)
		setTimeout(waiting, 3000)
		db.all(`SELECT id FROM products WHERE name = "${itemname}"`, function (err, results) {
            let ertek = results[0].id
            db.run(`INSERT INTO inventory (product_id, stock) VALUES ("${ertek}", 1)`)
            db.run(`INSERT INTO inventory2 (product_id, stock2) VALUES ("${ertek}", 1)`)
        })
		
	})
	res.redirect('/products')
}

function updatedcount (req, res){
    const { itemcount, id, raktar } = req.body
    let stock = "stock"
    if (raktar == "inventory2"){
        stock = "stock2"
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
	const {newname, newcategory, rowid, new_description} = req.body
	console.log(`az új név ${newname}`)
	let sqlString = `UPDATE products SET name = "${newname}" , category_id = "${newcategory}" , productdescription = "${new_description}" where  rowid="${rowid}"`
	console.log(sqlString)
	db.serialize(function(){
		db.run(sqlString)
	})
	res.redirect('/products')
}

function deleted (req, res){
	const {rowid} = req.body;
	db.serialize(function(){
		db.run(`DELETE FROM products WHERE  id = "${rowid}"`)
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