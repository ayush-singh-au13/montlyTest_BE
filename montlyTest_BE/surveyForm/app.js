const path = require('path');
const express = require('express');
const app = express();
const db = require("./config/db");
const bodyParser = require('body-parser');
const User = require("./model/userSchema");
const { urlencoded } = require('express');
const port = 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//static path
const staticPath = path.join(__dirname, "/public");  
const templatesPath = path.join(__dirname, "/views");



//template engine
app.set('view engine', 'hbs');
app.set("views", templatesPath);
app.use(express.static(staticPath));
console.log(staticPath);

//Health check
app.get('/', (req, res) => {
    res.render('app', {
        title: "Survey App"
    });
});

app.post('/survey', (req, res) => {
    const data = req.body;
    console.log(data);
//     res.send('posted successfully')
    User.findOne({ email: req.body.email }, (err, sameEmail) => {
    if(err) throw err;
      if (sameEmail) {
        return res.json({
            message: "Already filled"
        });
    }
      else {
        User.create(
          {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            gridRadios: req.body.gridRadios,
            gridCheck1: req.body.gridCheck1,
            experience: req.body.experience
          },
          (err, userData) => {
            if (err) throw err;
            res.json({
                message: "Successfully filled the survey",
                data: userData
            });
          }
        );
      }
    });
  });

app.listen(port, () => {
    console.log('Server is runnning..');
});