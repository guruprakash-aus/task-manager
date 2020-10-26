require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f47b945a643e80900863310').then((tasks) => {
//     console.log(tasks)
//     return Task.countDocuments({ completed : false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskandCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

deleteTaskandCount('5f47b815403090305069befd', false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})