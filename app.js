const express = require("express");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const mongoose = require('mongoose');


//Connect with mongo db
mongoose.connect('mongodb://127.0.0.1:27017/BookStoreDB')
        .then(()=>{console.log("Connected To mongodb database")})
        .catch((error)=>{console.log(`Connection failed to mongodb : ${error}`)})

// init app
const app = express();

// Apply middlewares
app.use(express.json());

// use books router
app.use("/api/authors",authorsRouter);
app.use("/api/books",booksRouter);

// Running the server
const PORT = 5000 ;
app.listen(PORT,()=>{
    console.log (`Server is running on port ${PORT}`);
})