exports.addcategory = (req, res) => {
    const { name, parant_id } = req.body

    if (name && !parant_id) {
        db.collection('category').findOne({ id: name }, (err, exist) => {
            if (!exist) {
                db.collection('category').insertOne({ id: name }, (err, data) => {
                    try {
                        if (err) throw err;
                        return res.json({ code: 200, msg: 'category inserted seccessfully' })
                    } catch (error) {
                        return res.json({ code: 500, msg: 'something went Wrong' })
                    }
                })
            } else {
                return res.json({ code: 200, msg: "category already available" })
            }
        })

    } else {
        if (name && parant_id) {
            db.collection('category').findOne({ id: name }, (err, exist) => {
                if (!exist) {
                    db.collection('category').findOne({ id: parant_id }, (err, data) => {
                        if(data){
                            var categoryStructure = {
                                id: name,
                                tree: data.tree ? data.tree.concat([parant_id]) : [parant_id],
                                parent: parant_id
                            }
                            db.collection('category').insertOne(categoryStructure, (err, data) => {
                                try {
                                    if (err) throw err;
                                    return res.json({ code: 200, msg: 'subcategory inserted seccessfully' })
                                } catch (error) {
                                    return res.json({ code: 500, msg: 'something went Wrong' })
                                }
                            })
                        } else {
                            return res.json({code: 200, msg: "parent_id not available"})
                        } 
                    })
                } else {
                    return res.json({ code: 200, msg: "category already available" })
                }
            })
        } else {
            return res.json({ code: 200, msg: 'fill all detail' })
        }
    }
}