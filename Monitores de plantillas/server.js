import express from 'express';
import { ProductManager } from './src/clases/ProductManager.js';

const pm = new ProductManager('./src/storage/products.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    const message = `
    <h1 style='color:blue;'>Bienvenido</h1>
    `
    res.send(message)
})

app.get('/products',async (req, res) => {
    const {limit} = req.query
    const products = await pm.getProducts(parseInt())
    const newProduct = products.slice(0, limit)
    res.json({mesage:'Productos enviados',newProduct})
})

app.get('/products/:idProduct',async (req, res) => {
    const {idProduct} = req.params
    const id = parseInt(idProduct)
    const product = await pm.getProductById(id)
    res.json({mesage:`Producto con la id ${id} enviado`,product})
})

app.post('/products', async (req, res) => {
    const prod = req.body
    res.json(await pm.addProduct(prod))
})

app.delete('/products/:idProduct',async (req, res) => {
    const {idProduct} = req.params
    const id = parseInt(idProduct)
    res.json(await pm.deleteProduct(id))
})

app.put('/products/:idProduct', async (req, res) => {
    const {idProduct} = req.params
    const prod = req.body
    res.json(await pm.updateProduct(parseInt(idProduct), prod))
})


app.listen(8080,() => {
    console.log('')
    console.info('      * Server runing on: http://localhost:8080')
    console.warn('      * Listen on port 8080')
    console.log('')
})