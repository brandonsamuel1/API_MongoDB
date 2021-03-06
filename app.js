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


// GET ALL ARTICLES

app.get('/api/articles', (req, res) => {
    Article.find({}, function(err, foundArticle) {
        if(!err) {
            res.send(foundArticle);
        } else {
            res.send(err);
        };
    });
});


// ADD A NEW ARTICLE

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


// DELETE AN ARTICLE
app.delete('/api/articles', (req, res) => {
    Article.deleteMany({}, function(err) {
        if(!err) {
            res.send('Successfuly deleted all articles!');
        } else {
            res.send(err);
        };
    });
});


// GET A SPECIFIC ARTICLE
app.get('/api/articles/:articleTitle', (req, res) => {
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
        if(!err) {
            res.send(foundArticle);
        } else {
            res.send(err)   
        };
    });
});


// UPDATE A SPECIFIC ARTICLE
app.put('/api/articles/:articleTitle', (req, res) => {
    Article.update(
        {title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content}, 
        {overwrite: true}, 
        function(err) {
            if(!err) {
                res.send('Successfully updated article!');
            }
        }
    );
});


// UPDATE A SPECIFIC ARTICLE
app.patch('/api/articles/:articleTitle', (req, res) => {
    Article.update(
        {title: req.params.articleTitle}, 
        {$set: req.body},
        function(err) {
            if(!err) {
                res.send('Successfully updated article');
            } else {
                res.send(err);
            }
        }
    );
});


// DELETE A SPECIFIC ARTICLE
app.delete('/api/articles/:articleTitle', (req, res) => {
    Article.deleteOne({title: req.params.articleTitle}, function(err) {
        if(!err) {
            res.send('Successfully deleted the article!');
        }
    });
});

app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...')
});