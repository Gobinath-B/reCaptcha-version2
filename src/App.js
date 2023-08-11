const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const axios = require("axios");
const { error } = require('console');

app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname ,"../views"));

app.get('/',(req,res)=>{
    res.render("index");
});

app.post('/verification',async (req,res)=>{
    
    //console.log(req.body);
    const {token} = req.body;
    const recaptchaSecretKey = '6LdXxJonAAAAAJ-h3Ywcz9ELYa-9QvLC63fDULN8';
    try{
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
              params: {
                secret: recaptchaSecretKey,
                response: token,
              },
            }
          );

        console.log(response);
        const {success} = response.data;
        if(success){
            console.log("user");
        }
        else{
            console.log("bot");
        }
    }
    catch(error){
        console.log(error)
    }
})


app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
})