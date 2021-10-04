exports.editProduct = (req, res) => {
    const {tag_id} = req.body
    console.log(tag_id)
    if(tag_id){
        const query = { tag_id: parseInt(tag_id) }
        db.collection('product').findOne(query, (err, result1) => {
            if (!err) {
                if (result1) {
                    const { name, description, price, category } = req.body

                    var wh = {};

                    if(req.files){
                        wh['images'] = req.newFile_name
                    }
                    if(name){
                        wh['name'] = name
                    }
                    if(description){
                        wh['description'] = description
                    }
                    if(price){
                        wh['price'] = price
                    }
                    if(category){
                        wh['Category'] = category
                    }
                    
                    var value = { $set: wh }

                    db.collection('product').updateOne(query, value, (err, success) => {
                        try {
                            if (err) throw err
                            return res.json({code: 200, msg: "product update successfully"})
                        } catch (error) {
                            return res.json({code: 500, msg: "something went wrong"})
                        }
                    })
                } else {
                    return res.json({ code: 200, msg: 'product not found' })
                }
            } else {
                return res.send({ error: 500, msg: 'something went wrong' })
            }
        })
    } else {
        return res.send({code: 200, msg: 'fill all detail'})
    }
}