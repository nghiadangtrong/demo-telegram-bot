const nodeMailer = require('nodemailer');

const configTransport = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    }
}

exports.sendMail = (to, subject, htmlContent) => {
  const options = {
    from: process.env.MAIL_FROM,
    to: to,
    subject: subject,
    html: htmlContent
  }
  console.log({ configTransport, options})
  const transport = nodeMailer.createTransport(configTransport)
  return transport.sendMail(options);
}