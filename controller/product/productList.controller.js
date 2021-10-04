exports.productList = (req, res) => {
    const { category } = req.body
    var perPage = (typeof req.body.perPage != 'undefined') ? parseInt(req.body.perPage) : 10;
    var page = (typeof req.body.page != 'undefined') ? (req.body.page == 0) ? 1 : req.body.page || 1 : 1;
    var skip = (perPage * page) - perPage;

    var query = {}
    if(category){
        query = {Category: category}
    }
    
    db.collection('product').find(query).sort({_id: -1}).skip(skip).limit(perPage).toArray((e, myalldata) => {
        db.collection('product').countDocuments(query, (er, userCount) => {
            
            var data = {
                data: myalldata
            }
            data['totalProduct'] = userCount
            data['current'] = page
            data['pages'] = Math.ceil(userCount / perPage)
            return res.json({ code: 200, data: data })

        })
    })
}