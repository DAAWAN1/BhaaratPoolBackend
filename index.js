const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const app= express();

const dotenv=require('dotenv').config();

const UserRouter = require('./routes/users.routes')
const swaggerSpec = require('./swagger/swagger');

const port=process.env.PORT||8080;
const mongodbUrl=process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users',UserRouter);
app.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
    mongoose.connect(mongodbUrl)
    .then(()=>{
        console.log('mongodb connected successsfully');
    }).catch((error)=>{
        console.log('error'+error.message);
    })
})