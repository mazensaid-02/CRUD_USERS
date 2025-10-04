const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/users').then(()=>{
    console.log('db connected');
    
}).catch(err=>{
    console.log('db not connected',err.message);
    
})