const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");


//parse data for post request
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect path
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// override with POST having ?_method=PATCH
app.use(methodOverride("_method"));


app.listen(port, (req, res) => {
    console.log(`app is linsting to port ${port}`);
});

//data for creating posts
posts = [
    {
        id: uuidv4(),
        user: "mohin",
        url: "/Assets/my-img1.jpg",
        caption: "believe in yourself",

    },
    {
        id: uuidv4(),
        user: "rahi",
        url: "/Assets/my-img2.jpg",
        caption: "Try your best",

    },
    {
        id: uuidv4(),
        user: "ruhi",
        url: "/Assets/nature.jpg",
        caption: "i got selected for my 1st internship",

    },
    {
        id: uuidv4(),
        user: "siam",
        url: "/Assets/camera-ai2.jpg",
        caption: "You can",

    },
      
];

//home route
app.get("/home", (req, res) => {
    res.render("index.ejs", {posts});
});

//create new post
app.get("/home/new", (req, res) => {
   res.render("new.ejs"); 
});

app.post("/home", (req, res) => {
    let id = uuidv4();
    let{user, url, caption} = req.body;
    posts.push({id,user, url, caption});
    res.redirect("/home");
 });

//post details route 
app.get("/home/:id/details", (req, res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    
    res.render("details.ejs", {post});
});

//post edit route 
app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
 });

app.patch("/home/:id", (req, res) => {
    let {id} = req.params;
    
    let newCap = req.body.caption;
    let newUrl = req.body.url;

    let post = posts.find((p) => id === p.id);
    post.caption = newCap;
    post.url = newUrl;
    res.redirect("/home");
});

//destroy route
app.get("/home/:id/destroy", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("destroy.ejs", {post})
})
app.delete("/home/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    
    res.redirect("/home");
});

