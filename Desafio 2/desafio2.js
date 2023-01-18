const ProdManager = require('./productManager.js')

const pm = new ProdManager.ProductManager('./products.json');

console.log(pm.getProducts())



console.log(pm.addProduct("Remera Asuka", "Remera manga corta de Asuka de Evangelion",6000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/903/627/products/asuka-langley1-8f88be6077ee5d40f716261367652874-480-0.webp", 1001, 250))

console.log(pm.getProductById(2))
