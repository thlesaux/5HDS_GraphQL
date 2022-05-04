const db = require('../db')

const { v4: uuidv4 } = require('uuid');

const Query = {
    products: () => db.products.list(),
}

const Mutation = {
    returnStringByCreateProduct: (root, args, context, info) => {
        //Object destructuration
        const { name, description, price, stock, reference } = args.input

        //Check if price or/and stock are positive or not equal to zero
        if (price <= 0) {
            throw new Error('Price can not be negative or equal to zero.')
        }

        if (stock < 0) {
            throw new Error('Stock can not be negative.')
        }

        db.products.create({
            id: uuidv4(),
            name: name,
            description: description,
            price: price,
            stock: stock,
            reference: uuidv4(),
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        });

        return `Product with '${name}' name has been successfully created.`
    },
    returnStringUpdateProductById: (root, args, context, info) => {
        const currentProduct = db.products.get(args.id)

        //Object destructuration
        const { name, description, price, stock } = args.input

        //Check if args are null/undefined or not
        if (name) { currentProduct.name = name }
        if (description) { currentProduct.description = description }
        if (price) { currentProduct.price = price }
        if (stock) { currentProduct.stock = stock }

        //Check if price or/and stock are positive or not equal to zero
        if (price <= 0) {
            throw new Error('Price can not be negative or equal to zero.')
        }

        if (stock < 0) {
            throw new Error('Stock can not be negative.')
        }

        db.products.update({
            id: args.id,
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            stock: currentProduct.stock,
            reference: currentProduct.reference,
            created_at: currentProduct.created_at,
            updated_at: new Date().toLocaleString()
        })

        return `Product with '${args.id}' name has been successfully updated.`
    },
    returnStringDeleteDataProductById: (root, args, context, info) => {
        db.products.delete(args.id)

        return `Product with '${args.id}' name has been successfully removed.`
    },
}

module.exports = { Query, Mutation }