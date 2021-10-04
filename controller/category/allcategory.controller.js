exports.allCategory = (req, res) => {

    var aggregation = [
        { $match: { tree: {$exists:false} } },
        {
            $graphLookup: {
                from: "category",
                startWith: "$id",
                connectFromField: "id",
                connectToField: "tree",
                depthField: "depth",
                as: "children"
            },
        }]

    db.collection('category').aggregate(aggregation).toArray((e, data) => {
        function list_to_tree(list) {
            var map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i++) {
                map[list[i].id] = i;
                list[i].children = [];
            }
            for (i = 0; i < list.length; i++) {
                node = list[i];
                if (node.parent !== null && map[node.parent] !== undefined) {
                    var node2 = {         //Because i need only _id,Title & childrens
                        _id: node._id,
                        id: node.id,
                        // parent: node.parent,
                        // tree: node.tree,
                        children: node.children
                    }      
                    list[map[node.parent]].children.push(node2); //You can push direct "node"
                } else {
                    var node2 = {
                        _id: node._id,
                        id: node.id,
                        // parent: node.parent,
                        // tree: node.tree,
                        children: node.children
                    }
                    roots.push(node2);
                }
            }
            return roots;
        }
        let final_result = []     //For Storing all parent with childs
        if (data.length >= 0) {   
            data.map(single_doc => {  //For getting all parent Tree
                var single_child = list_to_tree(single_doc.children)
                var obj = {
                    _id: single_doc._id,
                    id: single_doc.id,
                    children: single_child
                }
                final_result.push(obj)
            })
        }
        
        res.json(final_result)
    })

}