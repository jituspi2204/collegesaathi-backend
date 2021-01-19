var nodemailer = require('nodemailer');
var pug = require('pug');
module.exports = class Mail {
    constructor(user, url) {
      this.url = url;
      this.name = user.name;
      this.to = user.email;
      this.from = "neardaily.quasars@gmail.com";
    }
  
    newTransporter() {
      return new nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "apikey",
          pass:process.env.SENDGRID + "",
        },
      });
    }
  
    async send(template, subject, message,payload) {
      const html = pug.renderFile(`${__dirname}/../views/_${template}.pug`, {
        name: this.name,
        from: "Quasars <near.daily>",
        subject: subject,
        message: message,
        url : this.url,
        payload : payload
      });
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: subject,
        html: html,
      };
      await this.newTransporter().sendMail(mailOptions);
    }
  
    async otp() {
      await this.send(
        "welcome",
        "OTP for email verification",
        "In order to verify your mail and activate your account please use this OTP",
        {otp : 123456}
      );
    }
    async forgotPasswordEmail() {
      await this.send(
        "verifyUser",
        "Forgot Password",
        "Temporary login password !!"
      );
    }
  };
  