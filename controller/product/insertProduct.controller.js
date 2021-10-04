exports.insertProduct = (req, res) => {

    const { name, description, price, category } = req.body
    if (name && description && price && category) {

        var files = []
        for (var i = 0; i < req.files.length; i++) {
            files.push(req.files[i].originalname)
        }

        db.collection('category').findOne({id: category}, (err, existCategory) => {
            if(existCategory){
                db.collection('product').find().limit(1).sort({ _id: -1 }).toArray((err, data) => {

                    var indata = {
                        tag_id: data[0] ? data[0].tag_id + 1 : 1,
                        name: name,
                        slug: name.split(" ").join("-")+'-'+uniqid('A0', 6),
                        description: description,
                        price: price,
                        images: req.newFile_name,
                        Category: category
                    }
        
                    db.collection('product').insertOne(indata, (err, data) => {
                        if (!err) {
                            return res.json({ code: 200, msg: 'product inserted successfully' })
                        } else {
                            return res.json({ code: 500, msg: 'something went wrong' })
                        }
                    })
                })
            } else {
                return res.json({ code: 500, msg: 'category not available' })
            }
        })
    } else {
        return res.json({ code: 200, msg: 'fill all detail' })
    }
}