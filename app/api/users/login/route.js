import { connect } from '@/db/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import {} from '@/helpers/mailer'
connect()
export async function POST(request) {
    console.log('this is post')
    try {
        const reqBody = await request.json()
        const { userName, email, password } = reqBody
        // validation
        console.log(reqBody)
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser, 'saved user')

        // send email verification
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
        return NextResponse.json({
            message: 'User register successfully',
            success: true,
            savedUser
        })
    } catch (error) {
        return NextRequest.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(request) {}
