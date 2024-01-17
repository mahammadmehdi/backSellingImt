import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
const sellingSchema = new Schema({
    image: String,
    name: String,
    desc: String,

});

const sellingModel = mongoose.model('Selling', sellingSchema);

app.get('/', async (req, res) => {
    const selling = await sellingModel.find({})
    res.send(selling)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const selling = await sellingModel.findById(id)
    res.send(selling)
})

app.post('/', async (req, res) => {
    const { image, name, desc } = req.body
    const newSelling = new sellingModel({ image, name, desc })
    await newSelling.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { image, name, desc } = req.body
    const selling = await sellingModel.findByIdAndUpdate(id, { image, name, desc })
    res.send(selling)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const selling = await sellingModel.findByIdAndDelete(id)
    res.send(selling)
})

mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})