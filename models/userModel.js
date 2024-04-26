const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter your name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User
