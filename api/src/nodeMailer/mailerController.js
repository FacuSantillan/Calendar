const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "facusantillan1@gmail.com",
    pass: "gzia jeaa rzhv slco",
  },
});

transporter.verify().then(()=>{
    console.log('Server is ready to send emails!');
})

module.exports = {transporter}