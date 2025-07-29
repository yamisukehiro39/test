const express = require("express");
const router = express.Router();
const Joi = require("joi");


// books Array
const books = [
    {
        id : 1 ,
        name : "book 1"
    },
    {
        id : 2 ,
        name : "book 2"
    }
]

/**
* @desc     Get all books
* @route    /api/books
* @method   GET
* @access   public
*/

router.get("/",(req,res)=>{
    // res.send(JSON.stringify(books));
    res.json(books);
})

/**
* @desc     Get books by ID
* @route    /api/books/:id
* @method   GET
* @access   public
*/

router.get("/:id",(req,res)=>{
    const book = books.find(obj => obj.id === parseInt(req.params.id));
    if ( book ){
        res.status(200).json(book);
    }else{
        res.status(404).json({message : "Not Found"});
    }
})

/**
* @desc     Create new book
* @route    /api/books/
* @method   POST
* @access   public
*/

router.post("/",(req,res)=>{
    const { error } = validateCreateBook(req.body);
    if ( error ){
        return res.status(400).json(error.details[0].message); // 400 means probelem from client
    }
    const book = {
        id : books.length +1 ,
        name : req.body.title.trim() ,
    }
    books.push(book);
    res.status(201).json(books); // 201 means Created succefully 
})

/**
* @desc     Update a book
* @route    /api/books/:id
* @method   PUT
* @access   public
*/

router.put("/:id",(req,res)=>{

    const { error } = validateUpdateBook(req.body);
    if ( error ){
        return res.status(400).json(error.details[0].message);
    }
    
    book = books.find(d => d.id === parseInt(req.params.id))
    if ( book ){
        book.name = req.body.title ;
        res.status(200).json(books);
    }else{
        res.status(404).json("Book not found");
    }

});

function validateCreateBook (obj){
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).trim().required()
    });
    return schema.validate(obj);
}

function validateUpdateBook (obj){
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).trim()
    });
    return schema.validate(obj);
}

module.exports =  router