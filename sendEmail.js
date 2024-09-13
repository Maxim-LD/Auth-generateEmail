const nodemailer = require('nodemailer')



const sendEmail = async (email)=>{

   try {
    
        const mailTransport = nodemailer.createTransport({

            service: "gmail",
            auth: {

                email: "ayinde779@gmail.com",
                password: "kvjo habg diww fwde"
            }
        })

        const sentObject = {
            from: "ayinde779@gmail.com",
            to: email,
            subject: "CERTIFICATE OF ENROLLMENT",
            text: "Thanks for enrolling!" 
        

        }

        const result = await mailTransport.sendMail(sentObject)

    } catch (error) {

           console.log(error)
    
    }  

        console.log("Email sent successfully!")

}

module.exports = sendEmail