const fs = require('fs');

const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = `${user.name} <${user.email}>`;
    this.from = `Quizzato <${process.env.SENDGRID_SENDER_EMAIL}>`;
    this.url = url;
  }

  // Create New Transporter in node mailer
  newTransport() {
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ETHEREAL_USER, // generated ethereal user
          pass: process.env.ETHEREAL_PASS, // generated ethereal password
        },
      });
    }
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
  }

  // Send Messages function builder
  async send(subject, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    const info = await this.newTransport().sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // URL preview is only available on etheral.email
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  // Saying welcome to the new users
  async sendWelcome() {
    await this.send(
      'Welcome to Quizzato',
      this.replacingValues(
        'Quizato',
        'We are so glad you joined us 😀',
        'Check out your homepage to complete setting up your account',
        {
          link: this.url,
          text: 'Home page',
        }
      )
    );
  }

  // Password Reseting email
  async sendPasswordReset() {
    await this.send(
      'Password Reset',
      this.replacingValues(
        'Quizato',
        'Password Reset Token',
        'This token is only valid for the next 10 minutes',
        {
          link: this.url,
          text: 'Reset Password',
        }
      )
    );
  }

  // Reading email HTML template and replace the values
  replacingValues(title, heading, description, button) {
    const htmlEmailTemplate = fs.readFileSync(
      `${__dirname}/emailTemplate.html`,
      'utf-8'
    );
    return htmlEmailTemplate
      .replace('{%TITLE%}', title)
      .replace('{%HEADING%}', heading)
      .replace('{%DESCRIPTION%}', description)
      .replace('{%BUTTON_LINK%}', button.link)
      .replace('{%BUTTON_TEXT%}', button.text);
  }
};
