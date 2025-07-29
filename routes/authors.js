const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {Author} = require("../models/Author")


// authors array

const authors = [
    {
        id : 1 ,
        name : "othman"
    },
    {
        id : 2 ,
        name : "farah"
    },
    {
        id : 3 ,
        name : "youness"
    }
]

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

router.get("/",async (req,res)=>{
    try {
        const authorList = await Author.find().sort({firstname : 1}).select("firstName lastName");
        res.status(200).json(authorList);
    } catch (error) {
        res.status(500).json({message : "Something went wrong with getting authors data"});
    }
})

/**
 * @desc Get author by id
 * @route  /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id",async (req,res)=>{
    try {
        const author = await Author.findById(req.params.id);
        if ( author ){
            res.status(200).json(author);
        }else{
            res.status(404).json("Author Not found");
        }
    } catch (error) {
        console.log(erro);
        res.status(500).json({message : "something went wrong here"});
    }
})

/**
 * @desc   Create new author
 * @route  /api/authors/
 * @method POST
 * @access public
 */
 
router.post("/", async (req,res)=>{
    const { error } = verifyCreateAuthor(req.body);
    if ( error ){
        return res.status(400).json(error.details[0].message); 
    }
    try {
        const author = new Author ( {
        firstName : req.body.firstName ,
        lastName : req.body.lastName ,
        nationality : req.body.nationality ,
        image : req.body.image
    } )
    const result = await author.save();
    res.status(200).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json( { message : "something went Wrong ..." });
    }
})

/**
 * @desc   Update an author
 * @route  /api/authors/:id
 * @method PUT
 * @access public
 */

router.put("/:id", async (req,res)=>{
    const { error } = verifyUpdateAuthor(req.body);
    if ( error ){
        return res.status(400).json(error.details[0].message);
    }
})

// Verify Create author function

function verifyCreateAuthor (obj){
    const schema = Joi.object({
        firstName : Joi.string().min(3).max(200).trim().required() ,
        lastName : Joi.string().min(3).max(200).trim().required() ,
        nationality : Joi.string().min(3).max(200).trim().required() ,
        image : Joi.string().min(3) 
    })
    return schema.validate(obj);
}

// Verify Update author function

function verifyUpdateAuthor (obj){
    const schema = Joi.object({
        name : Joi.string().min(3).max(200).trim()
    })
    return schema.validate(obj);
}

module.exports = router ;