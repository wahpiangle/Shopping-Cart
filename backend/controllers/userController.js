const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//create web token function
const createToken = (_id) =>{
    return jwt.sign({_id: _id}, process.env.SECRET_KEY, {expiresIn: '1d'})
}

//login user
const loginUser = async(req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        const { name } = await User.findOne({email : email}).select('name -_id')
        const token = createToken(user._id)

        res.status(200).json({name, email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async(req, res) => {
    const { name, email, password } = req.body

    try{
        const user = await User.signup(name, email, password)

        const token = createToken(user._id)

        res.status(200).json({name, email, token})

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }
