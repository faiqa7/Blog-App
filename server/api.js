var express = require('express');
var router = express.Router();
const path = require("path");
var fs = require('fs');
var multer = require("./utilities/multer");
var cpUpload = multer.fields([
  { name: "file", maxCount: 1 },
]);
var Blog = require("./Blog");
const { Mongoose } = require('mongoose');

//upload file api
router.post("/upload", cpUpload, function (req, res) {
  return res.json({ url: `uploads/${req.files["file"][0].filename}` });
});


router.post("/add", function (req, res) {
    console.log(req.body);
    let blog = new Blog(req.body);
    blog.save(function (err, blog) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json(blog);
    })
});


router.get("/get/all", function (req, res) {
    let query = {};
    if (req.query.category) {
        query.category = new RegExp(req.query.category, "i");
    }
    Blog.find(query).sort({ createdAt: -1 }).exec(function (err, blogs) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json(blogs);
    })
});

router.get("/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json(blog);
    })
});

router.put("/edit/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        
        blog.title = req.body.title || blog.title;
        blog.author = req.body.author || blog.author;
        blog.category = req.body.category || blog.category;
        blog.image = req.body.image || blog.image;
        blog.description = req.body.description || blog.description;

        blog.save(function (err, blog) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json(blog);
        })
    })
});

router.get("/delete/:id", function(req, res, next) {

         Blog.findByIdAndRemove(req.params.id, (err) => {
            if (!err) {
                return res.json(Blog);
            } else {
                console.log('Failed to Delete user Details: ' + err);
            }
        });
     })



module.exports = router;