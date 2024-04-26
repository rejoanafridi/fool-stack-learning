import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect()
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connected')
        })
        connection.on('error', (err) => {
            console.log(
                'MongoDB connection error, please make sure db i sup running..' +
                    err
            )
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong in connection in db!!')
        console.log(error)
    }
}
