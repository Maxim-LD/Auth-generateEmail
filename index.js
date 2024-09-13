
const express = require("express")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const connectToDB = require("./db")
const Clients = require("./model/authModel")
const { validateRegistration, validateLogin, validateToken, validateEmail } = require("./middleware/validation")
const jwt = require("jsonwebtoken")
const generateCertificate = require("./generateCertificate")
const sendEmail = require("./sendEmail")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

connectToDB()

app.listen(PORT, ()=>{

    console.log(`Welcome to max live server........running on port ${PORT}`)
})

app.get("/", (req, res)=>{

    return res.status(200).json({message: "Welcome to Max Backend!"})
})

app.post("/create-user", validateRegistration, async (req, res)=>{

try {

    const { firstName, lastName, email, password, course } = req.body

    const existingUser = await Clients.findOne({email})

    if(existingUser){

        return res.status(400).json({message: "User already exist!"})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newClient = new Clients({ firstName, lastName, email, password: hashedPassword, course })

    await newClient.save()

    return res.status(200).json({

        message: "Account created successfully!", 
        client: newClient
    })


    } catch(error) {

        return res.status(500).json({message: error.message})
    }
})

app.post("/login", validateLogin, async (req, res)=>{

    try{
        const { email, password } = req.body

        const logUser = await Clients.findOne({ email })

        if(!logUser){
            return res.status(404).json({message: "User not found"})
        }

        const checkPassword = await bcrypt.compare(password, logUser.password)

        if(!checkPassword){

            return res.status(400).json({message: "Incorrect password or email!"})
        }


        const accessToken = jwt.sign(
                {logUser}, 
                `${process.env.ACCESS_TOKEN}`, 
                {expiresIn: "20m"})

        return res.status(200).json({

            message: "Login Successful",
            accessToken,
            logUser
        })
  
    }catch(error){

        return res.status(500).json({message: error.message})
    }
    
})

app.get("/generate-certificate", validateEmail, async (req, res)=>{

    try {

        const { email } = req.body

        const logUser = await Clients.findOne({ email })

        if(!logUser){
                return res.status(404).json({message: "User not found"})
            }

        const name = `${logUser.firstName} ${logUser.lastName}`

        const course = logUser.course

        await generateCertificate(name, course)

        await sendEmail(email)


        res.status(200).json({ message: "Certificate generated successfully!" })

    } catch (error) {
       
        res.status(500).json({ message: "An error occurred while generating the certificate", error: error.message })
    }

})

app.get("/users-list", async (req, res)=>{
    const users = await Clients.find()

    return res.status(200).json({
        count: users.length,
        message: "Successful", users
    })
})

app.post("/auth", validateToken, (req, res)=>{

    return res.status(200).json({
        message: "Success",
        client: req.checkDB
    })
})





app.use((req, res)=>{
    res.status(404).json({message: "This endpoint does not exist yet!"})
})


