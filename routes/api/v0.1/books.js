const express = require('express')
const router = express.Router()

// Get collection of books
router.get('/', (req, res) => {
    res.send('Hello world!')
})

// Get single book
router.get('/:id', (req, res) => {
    
})

// Create new book
router.post('/', (req, res) => {

})

// Full update of a book
router.put('/:id', (req, res) => {
    
})

// Update certain attributes of a book
router.patch('/:id', (req, res) => {
    
})

// Delete a book
router.delete('/:id', (req, res) => {
    
})

module.exports = router