const express = require ('express')
const router = express.Router()
const Book = require('../../models/book')

// Get list of all allowed methods (OPTIONS)
router.options('/', setOptions, async (request, response) => {
    response.set('Allow', response.options).json(response.options)
})
router.options('/:id', setOptions, async (request, response) => {
    response.set('Allow', response.options).json(response.options)
})

// Retrieve all books (GET)
router.get('/', async (request, response) =>{
    try{
        const books = await Book.find().populate('authors')
        response.status(200).json(books)
    }catch(error){
        response.status(500).json({message: error.message})
    }
})

// Retrieve a specific book (GET)
router.get('/:id', getBook, async (request, response) =>{
    response.json(response.book)
})

// Create a new book (POST)
router.post('/', async (request, response) =>{
    const book = new Book({
        _id: 999, // only temporary, is overwritten pre-save
        isbn: request.body.isbn,
        title: request.body.title,
        category: request.body.category,
        authors: request.body.authors,
        edition: request.body.edition,
        releaseYear: request.body.releaseYear,
        status: request.body.status
    })

    try{
        const newBook = await book.save()

        let books = await Book.find({"_id":newBook._id}).populate('authors')  
        let populatedBook = books[0]

        response.status(201).json(populatedBook)
    }catch(error){
        response.status(400).json({message: error.message})
    }
})

// Update certain details of a specific book (PATCH)
router.patch('/:id', getBook, async (request, response) =>{
    if(request.body.isbn != null){
        response.book.isbn = request.body.isbn
    }
    if(request.body.title != null){
        response.book.title = request.body.title
    }
    if(request.body.category != null){
        response.book.category = request.body.category
    }
    if(request.body.authors != null){
        response.book.authors = request.body.authors
    }
    if(request.body.edition != null){
        response.book.edition = request.body.edition
    }
    if(request.body.releaseYear != null){
        response.book.releaseYear = request.body.releaseYear
    }
    if(request.body.status != null){
        response.book.status = request.body.status
    }
    
    try{
        const updatedBook = await response.book.save()

        let books = await Book.find({"_id":request.params.id}).populate('authors')  
        let populatedBook = books[0]

        response.json(populatedBook)
    }
    catch(error){
        response.status(400).json({message: error.message})
    }
})

// Remove a specific book (DELETE)
router.delete('/:id', getBook, async (request, response) =>{
    try{
        if(response.book == null){
            response.status(200).json({message: "Object not existing"})
            return
        }
        await response.book.remove()
        response.json({message: 'Deleted book'})
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
})

// Reusable help method to retrieve a single book
async function getBook (request, response, next){
    let books, book
    try{
        books = await Book.find({"_id":request.params.id}).populate('authors')  
        book = books[0]
        
        if(book == null){
            return response.status(404).json({message: 'Cannot find book'})
        }
    }catch(error){
        return response.status(500).json({message: error.message})
    }
    response.book = book
    next()
}

// Reusable help method to set options
async function setOptions(request, response, next) {
    response.status(200).options = 'GET,HEAD,POST,PATCH,DELETE'
    next()
}

module.exports = router