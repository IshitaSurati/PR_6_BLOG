const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');
const path = require('path');
const connectDB = require('./config/db');

require('dotenv').config()
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || PORT;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB()
})

   

    
