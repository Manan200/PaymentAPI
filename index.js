// importing all the required modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const details = require('./models/pay')  //importing the database model

//Connecting to the database
const url = 'mongodb://localhost/PaymentDB'
mongoose.connect(url, { useNewUrlParser: true })

//Keys available on stripe portal
const PUBLISHABLE_KEY = "pk_test_51JiDImSGdyj3bs2k2buFZzP3eNizvtjKCUnizPGNO8pEAxWq1n9w7rcIIghm7cX6OEQl4Sqjqi73sh1t1VFsBRZy003AM0QiFX"
const SECRET_KEY = "sk_test_51JiDImSGdyj3bs2kWsCWgQ3MctgoJcatKYhcJwKCtYJAOqtNLNceF7QVW9r7ABcUpWoRbwGLPcT9i1PSLq4Xcndg00Jm5RyFvU"

const stripe = require('stripe')(SECRET_KEY)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))  // Setting the views directory
app.set('view engine', 'ejs')  // using ejs template engine

const port = process.env.port || 3000 // defining port number 

// Handling the get request
app.get('/', (req, res) => {
    res.render('Home', {
        key: PUBLISHABLE_KEY
    })
})

// Handling the post request from the payment form
app.post('/payment', function (req, res) {

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Manan Agrawal',
        address: {
            line1: 'C-289 Sector-8 Vidyadhar Nagar',
            postal_code: '302011',
            city: 'Jaipur',
            state: 'Rajasthan',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 7000,
                description: 'Web Development Product',
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            console.log(charge)
            const dt = new details({
                card: charge.payment_method_details.card,
                type: charge.payment_method_details.type
            })
            try {
                const a1 = dt.save()  // saving the payment details in our database
            }
            catch (err) {
                res.send('error')
            }
            res.send("Success") // If no error occurs 
        })
        .catch((err) => {
            res.send(err)    // If some error occurs 
        });
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})