const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account");

router.get("/test", (req, res) => {
  res.send("From a new file");
});

router.post("/users", async (req, res) => {
  // console.log(req.body)
  // res.send('testing!')
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    //
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token: token });
  } catch (e) {
    res.status(400).send(e);
  }

  // user.save().then(() => {
  //     res.status(201).send(user)
  // }).catch((e) => {
  //     // res.status(400)
  //     // res.send(e)
  //     //Above two is chained together. chaining
  //     res.status(400).send(e)
  // })
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//The below route is of no purpose because we cannot send other user
// infor to another user
// router.get("/users", auth, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // User.find({}).then((users) => {
//   //     res.send(users)
//   // }).catch((e) => {
//   //     res.status(500).send(e)
//   // })
// });

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    //
    res.send({ success: "Successfully Logged Out of all" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Not required. Handled in the read profile
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // User.findById(_id).then((user) => {
//   //     if (!user) {
//   //         return res.status(404).send()
//   //     }

//   //     res.send(user)
//   // }).catch((e) => {
//   //     res.status(500).send()
//   // })
//   //console.log(req.params)
// });

// router.patch("/users/:id", async (req, res) => {
//   //convert the request object into array
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   // const isValidOperation = updates.every((update) => {
//   //     //Runs the function for every item in the array
//   //     //Below function returns true or false
//   //     return allowedUpdates.includes(update)
//   // })
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Updates!" });
//   }
//   try {
//     //the findbyIDandUpdate method below bypasses the mongoose middleware
//     //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

//     const user = await User.findById(req.params.id);
//     //user.name = 'Something Else'
//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });

//     await user.save();

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

//Refactor to update the currently logged in user

router.patch("/users/me", auth, async (req, res) => {
  //convert the request object into array
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  // const isValidOperation = updates.every((update) => {
  //     //Runs the function for every item in the array
  //     //Below function returns true or false
  //     return allowedUpdates.includes(update)
  // })
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    //   //the findbyIDandUpdate method below bypasses the mongoose middleware
    //   //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    //   const user = await User.findById(req.params.id);
    //user.name = 'Something Else'
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.delete("/users/:id",  async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

//Adding auth to the above delete route

router.delete("/users/me", auth, async (req, res) => {
  try {
    //   const user = await User.findByIdAndDelete(req.user._id);

    //   if (!user) {
    //     return res.status(404).send();
    //   }

    await req.user.remove();
    sendCancelEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  //dest: "avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload JPG, JPEG or PNG images"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    //req.user.avatar = req.file.buffer;
    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//Fetching the avatar and getting image back
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
