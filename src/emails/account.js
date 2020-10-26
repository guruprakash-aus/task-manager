const sgMail = require("@sendgrid/mail");

//const sendgridAPIKey =
//"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";

//set the variable in sgMail to our account
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "rajendranguruprakash@gmail.com",
    subject: "Thanks for Joining In!!",
    text: `Welcome to the App, ${name}. Let me know how you get along with the app`,
    //We can do html email below
    //html: ''
  });
};

//Cancel Email
const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "rajendranguruprakash@gmail.com",
    subject: "Sorry to see you go!!",
    text: `Thanks for using our App, ${name}. Is there anything we could do for you to continue using our App?`,
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendCancelEmail: sendCancelEmail,
};

// sgMail.send({
//   to: "rajendranguruprakash@gmail.com",
//   from: "rajendranguruprakash@gmail.com",
//   subject: "This is my first creation!",
//   text: " I hope this one actually gets to you.",
// });
