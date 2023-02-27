const express = require ('express')
const router = express.Router()
const Author = require ('../../models/author')

// Get list of all allowed methods (OPTIONS)
router.options('/', setOptions, async (request, response) => {
    //response.set('Allow', 'GET,HEAD').status(200).json("GET,HEAD")
    response.set('Allow', response.options).json(response.options)
})
router.options('/:id', setOptions, async (request, response) => {
    //response.set('Allow', 'GET,HEAD').status(200).json("GET,HEAD")
    response.set('Allow', response.options).json(response.options)
})

// Retrieve all authors (GET)
router.get('/', async (request, response) =>{
    //response.set('Allow', 'GET, HEAD').status(405).json({message: 'Retrieving all authors is not allowed'})
    try{
        const author = await Author.find()
        response.status(200).json(author)
    }catch(error){
        response.status(500).json({message: error.message})
    }
})

// Retrieve a specific author (GET)
router.get('/:id', getAuthor, async (request, response) =>{
    response.json(response.author)
})

// Create a new author (POST)
router.post('/', async (request, response) =>{
    //response.set('Allow', 'GET, HEAD').status(405).json({message: 'New authors cannot be created'})
    const author = new Author({
        _id: 999, // only temporary, is overwritten pre-save
        "name.firstName": request.body.name.firstName,
        "name.surname": request.body.name.surname,
        publications: request.body.publications,
        link: "null"
    })

    try{
        const newAuthor = await author.save()
        response.status(201).json(newAuthor)
    }catch(error){
        response.status(400).json({message: error.message})
    }
})

// Update certain details of a specific author (PATCH)
router.patch('/:id', /*getAuthor,*/ async (request, response) =>{
    //response.set('Allow', 'GET, HEAD').status(405).json({message: 'Authors cannot be updated'})
    if(request.body.name != null){
        if(request.body.name.firstName != null){
            response.author.name.firstName = request.body.name.firstName
        }
        if(request.body.name.surname != null){
            response.author.name.surname = request.body.name.surname
        }
    }
    if(request.body.publications != null){
        response.author.publications = request.body.publications
    }

    try{
        const updatedAuthor = await response.author.save()
        response.json(updatedAuthor)
    }
    catch(error){
        response.status(400).json({message: error.message})
    }
})

// Remove a specific author (DELETE)
router.delete('/:id', /*getAuthor,*/ async (request, response) =>{
    //response.set('Allow', 'GET, HEAD').status(405).json({message: 'Authors cannot be deleted'})
    try{
        
        if(response.author == null){
            response.status(200).json({message: "Object not existing"})
            return
        }
        await response.author.remove()
        response.json({message: 'Deleted author'})
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
})

// Reusable help method to retrieve a single author
async function getAuthor (request, response, next){
    let authors, author
    try{
        authors = await Author.find({"_id":request.params.id})
        author = authors[0]
        
        if(author == null){
            return response.status(404).json({message: 'Cannot find author'})
        }
    }catch(error){
        return response.status(500).json({message: error.message})
    }
    response.author = author
    next()
}

// Reusable help method to set options
async function setOptions(request, response, next) {
    response.status(200).options = 'GET,HEAD'
    next()
}

module.exports = router