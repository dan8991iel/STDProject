const express = require ('express')
const router = express.Router()
const Author = require ('../../models/author')

//Getting all
router.get('/', async (reg, res) =>{
    try{
        const author = await Author.find()
        res.status(200).json(author)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Getting one
router.get('/:id', getAuthor, async (reg, res) =>{
    res.json(res.author)
})

//Creating one
router.post('/', async (reg, res) =>{
    const author = new Author({
        "name.firstName": req.body.name.firstName,
        "name.surname": req.body.name.s,
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
router.patch('/:id', getAuthor, async (reg, res) =>{
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
router.delete('/:id', getAuthor, async (reg, res) =>{
    try{
        await res.author.remove()
        res.json({message: 'Deleted Subscriber'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

async function getAuthor (reg, res, next){
    let author
    try{
        author = await Author.find(reg.params.id)
        if(author == null){
            return res.status(404).json({message: 'Cannot find Author'})
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    res.author = author
}

module.exports = router