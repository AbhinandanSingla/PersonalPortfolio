const express = require('express');
const path = require('path');
const hbs = require('hbs');
const connection = require('../server/conn/conn');
const bodyparser = require("body-parser");
const router = require('../server/routes/router');

const app = express();
connection();
const port = process.env.PORT || 8002;

const views_path = path.join(__dirname, '/views/pages');
const public_path = path.join(__dirname, '../public');
const partials_path = path.join(__dirname, '/views/partials')
const jquery = path.join(__dirname, '../node_modules/jquery/dist');

app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'hbs');
app.set('views', views_path);
app.use('/jquery', express.static(jquery)); //now /js is route for bootstrap js

hbs.registerPartials(partials_path);
app.use(express.static(public_path));
app.use(express.json());

app.use('/', router);


app.listen(port, () => {
    console.log('server started on port ' + port)
})