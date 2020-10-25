// external dependencies
const express    = require('express');
const router     = express.Router();
const nodemailer = require('nodemailer');

// local dependencies
const Contact    = require('../models/contact');
const helper     = require('../public/javascripts/helpers');

/*
 * GET request for home page
 */
router.get('/', (req, res, next) => {
	const userMessages = helper.composeFlashM(req.flash());
	res.render('index', { messages: userMessages });
});

/*
 * POST request from Contact Form
 */
router.post('/contact', (req, res, next) => {
  const newContact = new Contact({
    name:    req.body.name,
    email:   req.body.email,
    phone:   req.body.phone,
    company: req.body.company,
    message: req.body.message,
    date:    Date.now()
  });

  // saving message to database
  newContact.save((err, doc) => {
    const dbError = (!err) ? 'success' : 'error';
    const id      = doc._id;
    const date    = doc.date.toString();
    // composing Email body in HTML
    var emailHTML = `
      <p>You have a new contact request.</p>
      <h3>Message details:</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Company: ${req.body.company}</li>
        <li>DB Back-up: ${dbError}</li>
        <li>DB Reference ID: ${id}</li>
        <li>DB Reference Date: ${date}</li>
      </ul>
      <h3>Message text:</h3>
      <p>${req.body.message}</p>
      <br/>
      <p>... sent by nodemailer on www.electrosec.net.</p>
    `;

    // create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: process.env.EMAIL_FROM,                   // sender address
      to: process.env.EMAIL_TO,                       // list of receivers
      subject: 'Contact Request (www.electrosec.net)',// Subject line
      text: '***** Contact Request *****',            // plain text body
      html: emailHTML                                 // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        req.flash('success', 'Thank you for your Message. We will get back to you as soon as possible.');
      }
      res.redirect('/');
    });
  });
});

module.exports = router;
