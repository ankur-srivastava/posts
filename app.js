const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postRouter = require('./src/modules/postapi')
const authRoute = require('./src/routes/authRoute')
const authMiddleware = require('./src/middleware/auth')()

require('dotenv').config()

const app = express()

app.use(cors());

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware.initialize())

// Add routers
app.use('/api/auth', authRoute)
app.use('/api/post', postRouter)

const dbUrl = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.gavbp.mongodb.net/padakoo?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB Connected');
}).catch((error)=>{
    console.error('DB Connection Error ', error);
});

app.listen(8000, (req, res) => {
    console.log('Server Started')
});
