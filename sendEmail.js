const nodemailer = require('nodemailer')
const Clients = require("./model/authModel")
const generateCertificate = require('./generateCertificate')
require('dotenv').config()


const sendEmail = async (email)=>{

   try {

        const logUser = await Clients.findOne({ email })

        const name = `${logUser.firstName} ${logUser.lastName}`

        const filePath = await generateCertificate(name);

        const mailTransport = nodemailer.createTransport({

            service: "gmail",
            auth: {

                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASS}`
            }
        })

        const sentObject = {
            from: process.env.EMAIL,
            to: email,
            subject: "CERTIFICATE OF ENROLLMENT",
            text: "Thanks for enrolling!",
            attachments: [
                {
                    filename: `${name}-certificate.pdf`,
                    path: filePath,
                    contentType: 'application/pdf'
                }
            ] 
        
        }

        const result = await mailTransport.sendMail(sentObject)

    } catch (error) {

           console.log(error)
    
    }  

        console.log("Email sent successfully!")

}

module.exports = sendEmail