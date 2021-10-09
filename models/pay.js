const mongoose = require('mongoose')

// declaring the schema for the database
const paySchema = new mongoose.Schema({
    card:
    {
        brand: {
            type: String,
            default: 'visa'
        },
        checks: [Object],
        country: {
            type: String,
            default: 'US'
        },
        exp_month: Number,
        exp_year: Number,
        fingerprint: {
            type: String,
            default: 'Bt78493TqPd5BgTK'
        },
        funding: {
            type: String,
            default: 'credit'
        },
        installments: {
            type: Boolean,
            default: null
        },
        last4: {
            type: String,
            default: '4242'
        },
        network: {
            type: String,
            default: 'visa'
        },
        three_d_secure: {
            type: Boolean,
            default: null
        },
        wallet: {
            type: Boolean,
            default: null
        }
    },
    type:
    {
        type: String,
        default: 'card'
    }
})

// exporting the database model as a module
module.exports = mongoose.model('PayDetail', paySchema)