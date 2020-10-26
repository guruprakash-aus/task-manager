//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// //To work with ObjectID
// const objectID = mongodb.ObjectID

//Shorthand for the above three lines (deconstructing the object)
const { MongoClient, objectID, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'




MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    //console.log("Connected Correctly")
    const db = client.db(databaseName)

    //Delete Documents

    // db.collection('users').deleteMany({
    //     age: 33
    // }).then ((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        _id: new ObjectID("5f461b82548b772808ccbe59")
    }).then ((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


    //Update Documents Section

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f45391544186906a864b095")
    // }, {
    //     // $set: {
    //     //     name: 'Mike'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result)=> {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //updatemany
    // db.collection('tasks').updateMany({
    //     ncompleted: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    //     // $inc: {
    //     //     age: 1
    //     // }
    // }).then((result)=> {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })


    //Read Documents Section

    // db.collection('users').findOne({ _id: new ObjectID('5f4634940350cc200c4ee447')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({age: 32}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('5f461b82548b772808ccbe59') }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to Fetch task')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:true}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to Find the tasks')
    //     }

    //     console.log(tasks)

    // })



    //Create Documents Section
    //
    //The below insertOne function helps insert one document
    // db.collection('users').insertOne({
    //     name: "Vikram",
    //     age: 32
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert User")
    //     }

    //      console.log(result.ops)
    // })
    
    //The below insertMany functions help insert many documents
    // db.collection('users').insertMany([
    //     {
    //         name: 'Dhiyash',
    //         age: 6
    //     },
    //     {
    //         name: 'Sindhya',
    //         age: 32
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to Insert Documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Crack Open command Prompt',
    //         completed: true
    //     },
    //     {
    //         description: 'check if MongoDB is installed',
    //         completed: true
    //     },
    //     {
    //         description: 'Insert 3 tasks',
    //         completed: false
    //     }
    // ], (error,result) => {
    //     if (error) {
    //         return console.log('Unable to insert 3 tasks')
    //     }
    //     console.log(result.ops)
    // })

})


//Code to play with Object IDs
//const id = new ObjectID()
// console.log(id)
//console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)