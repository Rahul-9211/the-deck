import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host : process.env.SMPT_HOST,
  port : process.env.SMPT_PORT,
  secure : false,
  auth : {
    user : process.env.USER,
    pass : process.env.PASSWORD
  }
 }) 

export default async function handler(req, res) {
  try {
    console.log(req.body)
    console.log(process.env.SMPT_HOST)
    let info = await transporter.sendMail({
      from : req.body.email,
      to : 'webneststudios@gmail.com',
      subject : req.body.subject,
      text : req.body.content,
     })
    
    res.status(200).json({ h : "done" });
  } catch (err) {
    res.status(500) .json({ error: 'failed to load data' });
  }
}
