var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  // Need less secure apps Google
  service: 'gmail',
  auth: {
    user: 'cuentasebasmaciel@gmail.com',
    pass: 'NodeMailerPrueba'
  }
});

let emails = ["sebastian-maciel@outlook.com", "<sebastian.garcia204412@potros.itson.edu.mx", "itzel.aviles189046@potros.itson.edu.mx"];
var mailOptions = {
  from: 'cuentasebasmaciel@gmail.com',
  to: emails,
  subject: 'Recordatorio de Pago',
  html: '<h3>Hola estimado Usuario!</h3>Te recordamos que aún cuentas con boletos que no has pagado, por favor pasa a pagarlos o desapartarlos.<br><br>Gracias y que tenga un lindo día!',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});