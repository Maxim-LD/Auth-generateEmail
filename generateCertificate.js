
const pdfDocument = require('pdfkit')
const fs = require('fs')
// const Clients = require("./model/authModel")


const generateCertificate = (name, course)=>{
    return new Promise((resolve, reject) => {

        const doc = new pdfDocument()

        const filePath = `./certificates/${name}-certificate.pdf`

        const stream = fs.createWriteStream(filePath)
        doc.pipe(stream)

        doc
            .fontSize(30)
            .text(`Certificate of Participation`, {align: 'center'})
            .moveDown(1.5)

        doc 
            .fontSize(20)
            .text(`This is to certify that`, { align: 'center' })
            .moveDown(0.5)

        doc
            .fontSize(25)
            .fillColor('blue')
            .text(`${name}`, { align: 'center', underline: true })
            .moveDown(0.5)

        doc
            .fontSize(20)
            .fillColor('black')
            .text(`has successfully enrolled for`, { align: 'center' })
            .moveDown(0.5)

        doc
            .fontSize(25)
            .fillColor('green')
            .text(`${course}`, { align: 'center' })
            .moveDown(0.5)

        doc
            .fontSize(20)
            .fillColor('black')
            .text(`course.`, { align: 'center' })
            .moveDown(2)

        doc
            .fontSize(15)
            .text(`Date: ${new Date().toLocaleDateString()}`, 100, 500)

        doc
            .fontSize(15)
            .text('Signature: _____________________', 100, 550)

        doc.end()

        stream.on('finish', () => {
            resolve(filePath)
        })

    })    

} 



module.exports = generateCertificate