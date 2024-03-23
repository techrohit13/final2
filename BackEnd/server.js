const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;
const dotenv = require("dotenv");
dotenv.config();


const dishStaticRouter = require("./routes/dishes.router.js"); 

const dishDBRouter = require("./routes/dishesDB.router.js");

const authRouter = require("./routes/auth.router.js");

const userRouter = require("./routes/user.router.js");

const cartRouter = require("./routes/cart.router.js");

const orderRouter = require("./routes/order.router.js");

var mongoURL = "mongodb+srv://gauravraj:Mongo%40raj11@cluster0.cddlpyx.mongodb.net/FoodApp?retryWrites=true&w=majority" ;

mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology:true})

const con = mongoose.connection

con.on('connected', () => {
    console.log('MongoDB connected...')
})


app.get('/', (req, res) => res.send('Server is working !' + port));

app.use('/api/dishes' , dishStaticRouter);   //localhost:8000/api/dishes

app.use('/getdishes', dishDBRouter);         //localhost:8000/getdishes

app.use('/api/auth', authRouter);            //localhost:8000/api/auth

app.use('/api/users', userRouter);           //localhost:8000/api/users

app.use('/api/cart', cartRouter);            //localhost:8000/api/cart

app.use('/api/order', orderRouter);          ////localhost:8000/api/order


app.listen(port, () => console.log(`Food app is listening on port ${port}!`))