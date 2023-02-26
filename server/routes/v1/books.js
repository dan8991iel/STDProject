const express = require ('express')
const router = express.Router()
const Book = require('../../models/book')

//Getting all
router.get('/', async (req, res) =>{
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Getting one
router.get('/:id', getBook, async (req, res) =>{
    res.json(res.book)
})

//Creating one
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

//Update one
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

//Delete one
router.delete('/:id', getBook, async (req, res) =>{
    try{
        await res.book.remove()
        res.json({message: 'Deleted book'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

async function getBook (req, res, next){
    let book
    try{
        console.log(req.params.id);
        book = await Book.find({"_id":req.params.id})
        console.log(book);
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