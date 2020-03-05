const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const post_router = require('./routers/post_routers');
const get_router = require('./routers/get_routers');

const PORT = 3000;
const app = express();
app.use(express.json());
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));

// GET PARTS
app.get('/', (req, res)=>{
	res.redirect('/products')
})
app.get('/products', get_router.products)
app.get('/stocks',get_router.stocks)
app.get('/groups',get_router.groups)

//POST PARTS

app.post('/updated', post_router.updated)
app.post('/updatedcount', post_router.updatedcount)
app.post('/changes', post_router.changes)
app.post('/deleted', post_router.deleted)
app.post('/newgroup', post_router.newgroup)
app.post('/groupmod', post_router.groupmod)
app.post('/deletedgroup',post_router.deletedgroup)


app.listen(PORT, () => console.log(`App is started and listening on port ${PORT}`));
/*
db.serialize(function(){
	db.run(`DELETE FROM products WHERE  name = "vasalo"`);
})*/