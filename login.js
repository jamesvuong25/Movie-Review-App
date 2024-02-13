const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/stylesheets", express.static("stylesheets"));
app.use(express.static('public'));

// //set app port
app.listen(4500);

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Jimmychiv91!",
    database: "nodejs"
});

//connecting to database
connection.connect(function(error){
    if (error) {
        throw error;
    }
    else {
        console.log("Hi! Connected to the database succesfully!");
    }
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

//authenticating the username and password with the database
app.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from userLogin where user_name = ? and user_password  = ?", [username, password], function(error, results, fields){
        if (results.length > 0) {
            res.redirect("welcomePage.html");
            // res.sendFile(__dirname + "/public/welcomePage.html");
        }
        else { 
            res.redirect("/");  
        }
        res.end();
    });
});


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/createAccount.html");
})

//adding the new user login info to database
app.post("/register", encoder, function(req, res) {
    var newUsername = req.body.newUsername;
    var newPassword = req.body.newPassword;

    connection.query("insert into userLogin(user_name, user_password) values (?, ?)", [newUsername, newPassword], function(error, results, fields){
        if (results.length > 0) {
            res.redirect("/public/welcomePage.html");
        }
        else { 
            res.redirect("/");   
        }
        res.end();
    });
});

//when login is successful
app.get("/welcomePage.html", function(req, res) {
    res.sendFile(__dirname + "/welcomePage.html")
});

// Logout
// app.get('/logout', function(req, res, next){
//     var loggedin = req.body.loggedin;
//     // If the user is loggedin
//     if (req.session.loggedin) {
//           req.session.loggedin = false;
//           res.redirect('/');
//     }
//     else
//     {
//         res.redirect('/');
//     }
// });

