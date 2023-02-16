const express = require ('express')
const router = express.Router()
const Book = require('../models/book')

//Getting all
router.get('/', async (reg, res) =>{
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Getting one
router.get('/:id', (reg, res) =>{
    
})

//Creating one
router.post('/', (reg, res) =>{
  
})

//Update one
router.patch('/:id', (reg, res) =>{
  
})

//Delete one
router.delete('/:id', (reg, res) =>{

})

module.exports = router