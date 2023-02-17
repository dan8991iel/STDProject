const express = require ('express')
const router = express.Router()
const Author = require ('../../models/author')

//Getting all
router.get('/', async (req, res) =>{
    try{
        const author = await Author.find()
        res.status(200).json(author)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Getting one
router.get('/:id', getAuthor, async (req, res) =>{
    res.json(res.author)
})

//Creating one
router.post('/', async (req, res) =>{
    const author = new Author({
        _id: 999, // only temporary, is overwritten pre-save
        "name.firstName": req.body.name.firstName,
        "name.surname": req.body.name.surname,
        publications: req.body.publications
    })

    try{
        const newAuthor = await author.save()
        res.status(201).json(newAuthor)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//Update one
router.patch('/:id', getAuthor, async (req, res) =>{
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

//Delete one
router.delete('/:id', getAuthor, async (req, res) =>{
    try{
        await res.author.remove()
        res.json({message: 'Deleted author'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

async function getAuthor (req, res, next){
    let author
    try{
        author = await Author.find(req.params.id)
        if(author == null){
            return res.status(404).json({message: 'Cannot find author'})
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    res.author = author
}

module.exports = router