const User = require ('../models/User')


exports.createUser = async (req, res)=>{
    try{
        const user = new User(req,res);
        const saved = await user.saved();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};