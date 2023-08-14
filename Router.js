const express = require("express");
const router = express.Router();
const collection = require("./schema");
const mongoose = require("mongoose");


//mail
const nodemailer = require('nodemailer')

const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yogdharshni06@gmail.com',
        pass: process.env.password
    }
})



//Terminal suggesion
mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://yogdharshni06:yogdharshni06@bulk.tsnn9rs.mongodb.net", (err, db) => {

    var Database = db
    if (err) throw err;
    console.log('DB Connection Success');

    router.post('/emailTask/sentMail', async (req, res) => {
        var email = []
        let subject;
        let text;

        let mailContent = await req.body
        subject = mailContent.subject
        text = mailContent.body

        const composemail = {
            from: 'yogdharshni06@gmail.com',
            to: email,
            subject: subject,
            text: text
        }
        let userEmails = await Database.collection('userlist').find().toArray()
        userEmails.forEach(emails => {
            email.push(emails.email)

        });

        await sender.sendMail(composemail, (err, info) => {
            if (err) throw err

        })
        await res.json('mail sent successfully')

    })

    // new user Register
    router.post('/new', async (request, response) => {
        let name = await request.body.data.name
        let email = await request.body.data.email

        await Database.collection('userlist').insertOne({ name: name, email: email })
        let user = await Database.collection('userlist').find().toArray()
        await response.json(user)

    })

    // user entered
    router.get('/entered', async (req, response) => {
        let users = await Database.collection('userlist').find().toArray()
        await response.json(users)
    })






})
module.exports = router