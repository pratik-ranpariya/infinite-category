var express          = require('express')
    MongoClient      = require('mongodb').MongoClient
    objectId         = require('mongodb').ObjectID
    multer           = require('multer')
    assets           = require('assert')
    uniqid           = require('randomatic')
    app              = express()
    Api              = require('./model/api.Route.js')
    config           = require('./config/config.json')
    verson           = config.verson
    port             = config.port
    dbName           = config.mongodb.dbname

    url = 'mongodb://127.0.0.1:27017/task'
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './img');
        },
        filename: function (req, file, callback) {
            var file_name = file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1]
            req.newFile_name.push(file_name);
            callback(null, file_name);
        }
    })
    upload = multer({
        storage: storage
    })

    app.use(express.static('./img'));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assets.equal(null, err)
    if (err) throw err
    db = module.exports = client.db(dbName)
    console.log("mongodb is connected with database =", dbName)



    Api.serverApi()

})

server = app.listen(port, () => {
    console.log("We Are Live On " + port)
})