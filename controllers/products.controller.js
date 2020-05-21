const db = require('../db')

module.exports.index = (req, res) => {
    var page = parseInt(req.query.page) || 1 // n
    var perPage = 8   // x
    
    var start = (page - 1) * perPage
    var end = (page - 1) * perPage + perPage
    var drop = (page - 1) * perPage

    res.render('products/index', {
        products: db.get('products').value().slice(start, end),
        // products: db.get('products').drop(drop).take(perPage).value()
        buttonPrevious: page-1,
        button1: page,
        button2: page+1,
        button3: page+2,
        buttonNext: page+1,
    })
}

