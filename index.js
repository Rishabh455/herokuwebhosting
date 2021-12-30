const bp = require("body-parser");
const { response } = require("express");
const express = require("express");
const https = require("https");
//const request =require("request");

const app = express();
app.use(express.static("public"));

app.use(bp.urlencoded({ extended: true })); //rlo for bosy parser...
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }



        }]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/6a5222d132";
    const options = {
        method: "POST",
        auth: "Rishabh:beba61a1e1bd73aa6cc1036a5ce232e8-us20",

    }
     const request=https.request(url,options, function (response) {


        if(response.statusCode===200){
            res.sendFile(__dirname + "/sucess.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data))



      

    });

});
request.write(jsonData);
request.end();
});



app.post("/failure", function (req, res) {
res.redirect("/")
});
app.post("/sucess", function (req, res) {
    res.redirect("/")
    });
















        app.listen(process.env.Port||4000, function () {
            
        });

    

