const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv').config();

const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({extended:true,limit:'50mb'}));

// ROUTES
app.use('/users',userRoutes);
app.use('/categories',categoryRoutes);
app.use('/products',productRoutes);


mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('Successfully connected to database.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

