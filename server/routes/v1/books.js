const express = require ('express')
const router = express.Router()
const Book = require('../../models/book')

// Get list of all allowed methods (OPTIONS)
router.options('/', async (req, res) => {
    res.set('Allow', 'GET,HEAD,POST,PATCH,DELETE').status(200).json("GET,HEAD,POST,PATCH,DELETE")
})

// Retrieve all books (GET)
router.get('/', async (req, res) =>{
    try{
        const books = await Book.find().populate('authors')
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Retrieve a specific book (GET)
router.get('/:id', getBook, async (req, res) =>{
    res.json(res.book)
})

// Create a new book (POST)
router.post('/', async (req, res) =>{
    const book = new Book({
        _id: 999, // only temporary, is overwritten pre-save
        isbn: req.body.isbn,
        title: req.body.title,
        category: req.body.category,
        authors: req.body.authors,
        edition: req.body.edition,
        releaseYear: req.body.releaseYear,
        status: req.body.status
    })

    try{
        const newBook = await book.save()
        res.status(201).json(newBook)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// Update certain details of a specific book (PATCH)
router.patch('/:id', getBook, async (req, res) =>{
    if(req.body.isbn != null){
        res.book.isbn = req.body.isbn
    }
    if(req.body.title != null){
        res.book.title = req.body.title
    }
    if(req.body.category != null){
        res.book.category = req.body.category
    }
    if(req.body.authors != null){
        res.book.authors = req.body.authors
    }
    if(req.body.edition != null){
        res.book.edition = req.body.edition
    }
    if(req.body.releaseYear != null){
        res.book.releaseYear = req.body.releaseYear
    }
    if(req.body.status != null){
        res.book.status = req.body.status
    }
    
    try{
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

// Remove a specific book (DELETE)
router.delete('/:id', getBook, async (req, res) =>{
    try{
        if(res.book == null){
            res.status(200).json({message: "Object not existing"})
            return
        }
        await res.book.remove()
        res.json({message: 'Deleted book'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Reusable help method to retrieve a single book
async function getBook (req, res, next){
    let books, book
    try{
        console.log(req.params.id);
        books = await Book.find({"_id":req.params.id}).populate('authors')  
        book = books[0]
        
        if(book == null){
            return res.status(404).json({message: 'Cannot find book'})
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    res.book = book
    next()
}

module.exports = router