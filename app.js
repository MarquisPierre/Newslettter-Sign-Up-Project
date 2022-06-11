const express = require('express')
const bodyParser= require("body-parser")
const request = require("request")

const app = express()
const port = 3000


app.use("/public" , express.static(__dirname +"/public"))

app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})



app.post("/" , (req, res)=>{
  var firstName = req.body.fname
  var lastName = req.body.lname
  var email = req.body.email

  console.log(firstName);
  console.log(lastName);
  console.log(email)

})



app.listen(port, () =>{
    console.log(`Server is up and running on ${port}!`)
} )


// 38003f9510ecd7a400fe753857ac3cfe-us13