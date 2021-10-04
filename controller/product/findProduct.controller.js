exports.findProduct = (req, res) => {
    const { slug } = req.body
    if(slug){
        // var Sname = { name: { $regex: name+'.*', $options: 'i' } }
        var slugs = {slug : slug}

        var aggregate = [{
            $lookup:
            {
                from: "category",
                localField: "Category",
                foreignField: "id",
                as: "Ncategory"
            }
        }, 
        { $unwind: "$Ncategory" },
        {
            $project: {
                _id: 1,
                tag_id: 1,
                slug: 1,
                Category: 1,
                category_hierarchy: "$Ncategory.tree",
                name: 1,
                price: 1,
                description: 1,
                images: 1
            }
        },
        {
            $match: slugs
        }
    ]
        db.collection('product').aggregate(aggregate).toArray((err, data) => {
            if(!err) {
                var mydata = []
                for(var i = 0; i < data.length; i++){
                    mydata.push({
                        ...data[i], 
                        category_hierarchy: data[i].category_hierarchy.join(" > ")+' > '+data[i].Category
                    })
                }

                var slugData = mydata[0] ? mydata[0] : {}

                return res.json({ code: 200, data: slugData })
            } else {
                return res.json({code: 500, msg: "something went wrong"})
            }
        })
    } else {
        return res.json({code: 500, msg: "something went wrong"})
    }
}