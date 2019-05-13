const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get('/api/articles', (req, res) => {
    Article.find({}, function(err, foundArticle) {
        res.send(foundArticle);
    });
});


app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...')
});