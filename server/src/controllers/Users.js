const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/Users');

exports.registerUser = async (req, res) => {
    const {username, password} = req.body;
    
    const user = await userModel.findOne({ username });

    if (user) {
        return res.status(409).json({message: 'User already exists!'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({username, password: hashedPassword});
    await newUser.save();

    res.status(201).json({message: "user registered successfully!"});
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(404).json({message: 'User doesn\'t exit!'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({message: 'Username or Password is incorrect!'})
    }

    const token = jwt.sign({id: user._id}, 'secret');

    res.json({token, userID: user._id});

}