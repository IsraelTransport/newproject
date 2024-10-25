require('dotenv').config(); // Load .env at the top of the main server file
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // This should match your .env EMAIL_USER
        pass: process.env.EMAIL_PASS  // This should match your .env EMAIL_PASS
    }
});

async function sendVerificationEmail(email, code) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        html: `<p>Your verification code is:</p><h1>${code}</h1>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
}
async function sendEmail(email, subject, htmlContent) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
}

module.exports = { sendVerificationEmail, sendEmail  };
