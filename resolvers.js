const db = require('./db')

const Query = {
    users: () => db.users.list(),
    products: () => db.products.list(),
}

const User = {
    //
}

const Product = {
    //
}

module.exports = { Query, User, Product }