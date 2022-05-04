const db = require('../db')

const { v4: uuidv4 } = require('uuid')

const Query = {
    users: () => db.users.list(),
}

const Mutation = {
    returnStringByCreateUser: (root, args, context, info) => {
        //Object destructuration
        const { firstname, lastname, role } = args.input

        //Check if firstName or lastName contains number(s)
        if (/\d/.test(firstname)) {
            throw new Error('First name is not valid.')
        }

        if (/\d/.test(lastname)) {
            throw new Error('Last name is not valid.')
        }

        if (/\d/.test(role)) {
            throw new Error('Role is not valid.')
        }

        db.users.create({
            id: uuidv4(),
            firstname: firstname,
            lastname: lastname,
            role: role,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        })

        return `User with '${firstname} ${lastname}' name has been successfully created.`
    },
    returnStringUpdateUserById: (root, args, context, info) => {
        const currentUser = db.users.get(args.id)

        //Object destructuration
        const { firstname, lastname, role } = args.input

        //Check if args are null/undefined or not
        if (firstname) { currentUser.firstname = firstname }
        if (lastname) { currentUser.lastname = lastname }
        if (role) { currentUser.role = role }

        //Check if firstName or lastName contains number(s)
        if (/\d/.test(firstname)) {
            throw new Error('First name is not valid.')
        }

        if (/\d/.test(lastname)) {
            throw new Error('Last name is not valid.')
        }

        if (/\d/.test(role)) {
            throw new Error('Role is not valid.')
        }

        db.users.update({
            id: args.id,
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            role: currentUser.role,
            created_at: currentUser.created_at,
            updated_at: new Date().toLocaleString()
        })

        return `User with '${args.id}' id has been successfully updated.`
    },
    returnStringDeleteDataUserById: (root, args, context, info) => {
        db.users.delete(args.id)

        return `User with '${args.id}' id has been successfully removed.`
    },
}

module.exports = { Query, Mutation }