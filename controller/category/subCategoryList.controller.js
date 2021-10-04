exports.subCategoryList = async (req, res) => {
    const {parant_id} = req.body
    if(parant_id){
        try {
            const mydata = { parant_id: parant_id }
            db.collection('category').find({parent: parant_id}).project({id: 1}).toArray((err, data) => {
                if(!err){
                    return res.json({code: 200, data: data})
                } else {
                    return res.json({ code: 500, msg: 'something went wrong' })
                }
            })
        } catch (error) {
            return res.json({ code: 500, msg: 'something went wrong' })
        }
    } else {
        return res.json({ code: 200, msg: 'fill all detail' })
    }
}