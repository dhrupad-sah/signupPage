const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res)=>
{
    
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;

   const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
   }

   const jsonData = JSON.stringify(data);

   const url = "https://us8.api.mailchimp.com/3.0/lists/3ee62f8dc6";

   const options= {
          method: "POST",
          auth: "dhrupad:afcd803df7743036ed6fb50974bbbb4b-us8"
   }

   const request =https.request(url, options,(response)=>{

    if(response.statusCode === 200)
    {
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }

       response.on("data", (data)=>
       {
        console.log(JSON.parse(data))
       });
   })

   request.write(jsonData);
   request.end();
}
);

app.post("/failure", (req,res)=>
{
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, ()=>
{
    console.log("Server is running on port 3000");
})


//api key
//afcd803df7743036ed6fb50974bbbb4b-us8

//audience id
//3ee62f8dc6