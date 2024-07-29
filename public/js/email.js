const nodemailer = require ('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
async function sendEmail(mailOptions) {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, error: error.message };
    }
}
module.exports = { sendEmail };