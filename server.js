const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");



mongoose.connect('mongodb://localhost:27017/users').then(()=>{
    console.log('db connected');
    
}).catch(err=>{
    console.log('db not connected',err.message);
    
})
app.use(cors());          // <-- autorise toutes les origines
app.use(express.json());
app.use('/api/users', userRoutes);



app.listen(5000,()=>{
    console.log('server running');
    
})
