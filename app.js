const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }));//querysrting 분석 
app.use("/user",[userRouter]);
app.use(function(err, req, res, next) {              
    console.error(err.stack);
    res.status(500).send('Something broke!');          
  });

mongoose.connect("mongodb://localhost/people_of_gethering", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB connection error:"));

app.listen(port, () => {
    console.log(new Date().toLocaleTimeString(), port, '포트 연결')
})