const User = require ('../models/User')


exports.createUser = async (req, res)=>{
    try{
        //const { name, email, password } = req.body;
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getUsers = async(req,res)=>{
    const users = await User.find();
    res.json(users);
};

exports.getUsers = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: 'user not found'});
        res.json(user)
    } catch {
        res.status(400).json({error:'invalid id'});
    }
};

exports.updateUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!user)return res.status(404).json({error:'user not found'});
        res.json(user);
    }catch{
        res.status(400).json({error:'invalid id'});

    }
};

exports.deleteUser = async (req,res)=>{
    try{
        const user = User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({error:'user not found'});
        res.json({message:'user deleted'});
    }catch{
            res.status(400).json({ error: 'Invalid ID' });

    }

}