const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/Users')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);

mongoose.connect('mongodb+srv://aldilukmn:qs1hXe27TDbdYH5x@cluster0.i3wdhtg.mongodb.net/recipes?retryWrites=true&w=majority')

app.listen(4000, () => console.log('Server started on 4000'));