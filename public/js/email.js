const nodemailer = require ('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     secure: true,
//     auth: {
//       user: "ejacosta86@gmail.com",
//       pass: "caae icud zvvn jczf",
//     },
//   });

// app.post("/send-email", async (req, res) => {

//     const mailOptions = {
//       from: '"Mood-Sync" <ejacosta86@gmail.com>', // sender address
//       to: "manuelpena0207@gmail.com, jessicajinsong@gmail.com", // list of receivers
//       subject: "Mood-Sync", // Subject line
//       text: "Hello from Mood-Sync", // plain text body
//       html: "<b>Things to help sync your mood!</b>", // html bod 
//     }

//     try {
//         const info = await transporter.sendMail(mailOptions)
//         console.log("sent email", info)
//         res.json({success : true})
//     } catch (error) {
//         console.log(error)
//     }
// })

// app.get("/test-email", async (req, res) => {

//     const mailOptions = {
//       from: '"Mood-Sync" <ejacosta86@gmail.com>', // sender address
//       to: "manuelpena0207@gmail.com, jessicajinsong@gmail.com", // list of receivers
//       subject: "Mood-Sync", // Subject line
//       text: "Hello from Mood-Sync", // plain text body
//       html: "<b>Things to help sync your mood!</b>", // html bod 
//     }

//     try {
//         const info = await transporter.sendMail(mailOptions)
//         console.log( "data", info)
//         console.log(info.messageId)
//         res.json({success : true})
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, error: error.message})
//     }
// })

// async function mail() {

// const transporter = nodemailer.createTransport({
//   // host: 'smtp.gmail.com',
//   // port: 465,
//   // secure: true,
//   service: 'gmail',
//   auth: {
//     user: 'ejacosta86@gmail.com',
//     pass: 'caae icud zvvn jczf'
//   },
// });

// const info = await transporter.sendMail({
//   from: 'Erica with Mood-Sync <ejacosta86@gmail.com>',
//   to: 'manuelpena0207@gmail.com',
//   subject: 'Mood-Sync',
//   html: '<b>Things to help sync your mood!</b>',
//   }).then(() => {
//     console.log('Email sent');
//   }).catch(err => {
//     console.error(err);
//   });

// }
//  mail();

