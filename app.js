const express = require('express')
const bodyParser= require("body-parser")
const request = require("request")
const https = require("https")
const app = express()
const port = process.env.PORT

//Gets static Files
app.use("/public" , express.static(__dirname +"/public"))
// Implements body parser so the HTML can be interacted
app.use(bodyParser.urlencoded({extended:true}))


// gets and return an HTML page/file
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

// Post to the server using mailchimp API
app.post("/" , fucntion (req, res) {
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)
  const  url = "https://us13.api.mailchimp.com/3.0/lists/03a237e833"
  const options = {
      method: "POST",
      auth: "marquis27:API-key"
  }

     const request = https.request(url,options,function(response){
      
         if (response.statusCode == 200) {
          res.sendFile(__dirname + "/success.html")
         } else{
          res.sendFile(__dirname + "/failure.html")
         }


       response.on("data" , function (data) { 
        console.log(JSON.parse(data));
        })
     })
  request.write(jsonData)
  request.end()


})
  
      
      app.post("/failure" , (req,res)=>{
          res.redirect("/")
       })
  
       
    
  
app.listen(port || 3000, () =>{
    console.log(`Server is up and running on ${port}!`)
} )


