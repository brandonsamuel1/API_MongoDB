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
        if(!err) {
            res.send(foundArticle);
        } else {
            res.send(err);
        };
    });
});


app.post('/api/articles', (req, res) => {
    var title = req.body.title;
    var content = req.body.content;

    const newArticle = new Article({
        title: title,
        content: content
    });

    newArticle.save(function(err) {
        if(!err) {
            res.send('Successfully added a new article!');
        } else {
            res.send(err)
        };
    });
});


app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...')
});