
require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const morgan = require('morgan');
const port =  process.env.PORT || 4000
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
  useTempFiles:true
}));


const mongoose = require('mongoose')
require('./src/db/mongoose.js')
mongoose.set('useCreateIndex',true);



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });




// Routes
const userRoutes = require("./src/routes/user");
const jobRoutes = require("./src/routes/jobs");
const photoRoutes = require("./src/routes/photo");
// Middleware for routes
app.use("/users", userRoutes);
app.use("/jobs",jobRoutes);
app.use("/photos",photoRoutes);

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})