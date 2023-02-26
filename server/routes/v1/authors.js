const express = require ('express')
const router = express.Router()
const Author = require ('../../models/author')

// Get list of all allowed methods (OPTIONS)
router.options('/', async (req, res) => {
    res.set('Allow', 'GET,HEAD').status(200).json("GET,HEAD")
})

// Retrieve all authors (GET)
router.get('/', async (req, res) =>{
    //res.set('Allow', 'GET, HEAD').status(405).json({message: 'Retrieving all authors is not allowed'})
    try{
        const author = await Author.find()
        res.status(200).json(author)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Retrieve a specific author (GET)
router.get('/:id', getAuthor, async (req, res) =>{
    res.json(res.author)
})

// Create a new author (POST)
router.post('/', async (req, res) =>{
    //res.set('Allow', 'GET, HEAD').status(405).json({message: 'New authors cannot be created'})
    const author = new Author({
        _id: 999, // only temporary, is overwritten pre-save
        "name.firstName": req.body.name.firstName,
        "name.surname": req.body.name.surname,
        publications: req.body.publications,
        link: "null"
    })

    try{
        const newAuthor = await author.save()
        res.status(201).json(newAuthor)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// Update certain details of a specific author (PATCH)
router.patch('/:id', /*getAuthor,*/ async (req, res) =>{
    //res.set('Allow', 'GET, HEAD').status(405).json({message: 'Authors cannot be updated'})
    if(req.body.name != null){
        if(req.body.name.firstName != null){
            res.author.name.firstName = req.body.name.firstName
        }
        if(req.body.name.surname != null){
            res.author.name.surname = req.body.name.surname
        }
    }
    if(req.body.publications != null){
        res.author.publications = req.body.publications
    }

    try{
        const updatedAuthor = await res.author.save()
        res.json(updatedAuthor)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

// Remove a specific author (DELETE)
router.delete('/:id', /*getAuthor,*/ async (req, res) =>{
    //res.set('Allow', 'GET, HEAD').status(405).json({message: 'Authors cannot be deleted'})
    try{
        
        if(res.author == null){
            res.status(200).json({message: "Object not existing"})
            return
        }
        await res.author.remove()
        res.json({message: 'Deleted author'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Reusable help method to retrieve a single author
async function getAuthor (req, res, next){
    let authors, author
    try{
        authors = await Author.find({"_id":req.params.id})
        author = authors[0]
        
        if(author == null){
            return res.status(404).json({message: 'Cannot find author'})
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    res.author = author
    next()
}

module.exports = router