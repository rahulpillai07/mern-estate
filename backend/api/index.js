import express from 'express';
import connect from '../dbConfig/index.js';
import userRouter from '../routes/user.route.js'

const app=express();
connect();
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

app.use('/api/user',userRouter);