var iProduct = require('../controller/product/insertProduct.controller');
var eProduct = require('../controller/product/editProduct.controller');
var pList = require('../controller/product/productList.controller')
var fProduct = require('../controller/product/findProduct.controller')
var acategory = require('../controller/category/addcategory.controller')
var scList = require('../controller/category/subCategoryList.controller')
var middleWare = require('../middleware/support.middleware')
var aCategory = require('../controller/category/allcategory.controller')

module.exports = {

    serverApi: () => {
        
        app.post('/insertProduct', middleWare.files, upload.any(), iProduct.insertProduct)
        app.post('/editProduct', middleWare.files, upload.any(), eProduct.editProduct)
        app.post('/productList', pList.productList)
        app.post('/findProduct', fProduct.findProduct)
        app.post('/addcategory', acategory.addcategory)
        app.post('/subCategoryList', scList.subCategoryList)
        app.get('/allcategory', aCategory.allCategory)
        
        app.use((req, res) => {
            return res.json({
                code: 404, 
                msg: 'looking page not found'
            })
        })
    }
}