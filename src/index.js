const express = require("express");
require("./db/mongoose");
//const User = require('./models/user')
//const Task = require('./models/task')

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT;

// Multer for File Uploads
// const multer = require("multer");
// // We can
// const upload = multer({
//   dest: "images",
//   limits: {
//     // 1 MB converted to bytes
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     //if (!file.originalname.endsWith("pdf")) {
//     //     return cb(new Error("Please upload a PDF"));
//     // }

//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a Word Document"));
//     }

//     cb(undefined, true);

//     // //send back an error
//     // cb(new Error('File must be a PDF'))
//     // //When Upload is fine.
//     // cb(undefined, true)
//     // // To reject the upload
//     // cb(undefined, false)
//   },
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my Middleware");
// };

//upload.single() is the middleware from multer
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send();
// });

//Multer Upload route sample
// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message});
//   }
// );

//Middleware function that runs before calling the route handler
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }

//   //console.log(req.method, req.path);
//   //next();
// });

// app.use((req, res, next) => {
//   res.status(503).send("Server under Maintenance");
// });

app.use(express.json());

// const router = new express.Router()
// router.get('/test', (req,res) => {
//     res.send("This is from my other router")
// })
// app.use(router)
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   //   const task = await Task.findById("5f857d4478e79e3bf4274b80");
//   //   await task.populate('author').execPopulate()
//   //   console.log(task.author);

//   const user = await User.findById("5f857c6bb18bb23bbcc327bd");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();

// const pet = {
//   name: "Hal",
// };

// pet.toJSON = function () {
//   return {};
//   // console.log(this)
//   // return this
// };

// console.log(JSON.stringify(pet));

//const bcrypt = require('bcryptjs')

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewnodecourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewnodecourse");
//   console.log(data);
//   /*
//     const password = "Redg1298654"
//     //The second argument is the number of rounds for hashing the password
//     //8 is ideal with security and speed.
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Redg1298654', hashedPassword)

//     console.log(isMatch)
//     */
// };

// myFunction();
