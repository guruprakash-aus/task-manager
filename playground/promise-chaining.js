require('../src/db/mongoose')
const User = require('../src/models/user')

//5f47a25df5d4632ed0a6b545

//Mongoose library takes care of the $set below
// User.findByIdAndUpdate('5f47a2afdfe4c02288b5834f', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age})
    return count   
}

updateAgeAndCount('5f47a2afdfe4c02288b5834f', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
}) 