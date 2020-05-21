require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const userRoute = require('./routers/user.route')
const authRoute = require('./routers/auth.route')
const productsRoute = require('./routers/products.route')
var authMiddleware = require('./middlewares/auth.middleware')

const port = 80 

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nguyen Ha Trang'
    })
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/products', productsRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
