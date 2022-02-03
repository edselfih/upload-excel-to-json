const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const bodyParser  = require('body-parser');  

const app = express();

const uploadRoutes = require('./routes/index')

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname,'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs' , ejsMate);

const dbUrl = 'mongodb://localhost:27017/exceldemo';

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
    console.log('sukses')
}

app.use('/', uploadRoutes)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`serving on port ${port}`)
})