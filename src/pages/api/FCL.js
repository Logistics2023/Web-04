const nodemailer = require('nodemailer');
var html_to_pdf = require('html-pdf-node');

export default function handler(req, res) {




        let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
    // or //
    // let file = { url: "https://example.com" };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
    });

















    const transporter = nodemailer.createTransport({
        // host: 'mail.logisticsgear.com.bo',
        host: 'mail.logisticsappbolivia.com',
        port: 465,
        secure: true,
        auth: {
            // user: 'info@logisticsgear.com.bo',
            // pass: 'Jose84226'
            user: 'rrhh@logisticsappbolivia.com',
            pass: 'LGTRANSPORT2017.'
        }
    });
    async function handlerSendEmail() {

        var fileBuffer = Buffer.from(req.body.cv, 'base64')

        await transporter.sendMail({
            from: req.body['Correo electrónico'],
            to: 'rrhh@logisticsappbolivia.com',
            subject: ` Nueva postulación: ${req.body['Nombre completo']} - ${req.body['Area a postula']}`,
            p: `
                Nombre: ${req.body['Nombre completo']}\n
                Email: ${req.body['Correo electrónico']}\n
                Área: ${req.body['Area a postula']}\n
                Celular: ${req.body['Celular']}\n
                Residencia: ${req.body['Lugar de residencia']}\n
                Tipo de postulación: ${req.body['Tipo de postulación']}\n
                Estudia actualmente: ${req.body['']}\n
                Institución: ${req.body}`,
            html: '<p>Gracias por postular, pronto nos comunicaremos con usted.</p>',

            attachments: [
                {
                    filename: `${req.body['Nombre completo']}.pdf`,
                    content: req.body.cv.split("base64,")[1],
                    encoding: 'base64'
                }
            ]
        });
        res.json({ success: 'true' })
    }

    handlerSendEmail()



}