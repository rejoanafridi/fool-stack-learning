import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bycrypt from 'bcryptjs'
export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        //  configure mail for usages
        const hashedToken = await bycrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'a2c524db4967bd',
                pass: '806e54bb05b085'
            }
        })
        const mailOption = {
            from: 'rejoanafridi93@gmail.com', // sender address
            to: email, // list of receivers
            subject:
                emailType === 'VERIFY'
                    ? 'VERIFY your email'
                    : 'Reset your password',
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        }
        const mailResponse = await transporter.sendMail(mailOption)

        return mailResponse
    } catch (err) {
        throw new Error(err.message)
    }
}
