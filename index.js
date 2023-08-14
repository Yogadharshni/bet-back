const express = require('express');
const app = express();
const dotenv = require('dotenv')
const port = process.env.port || 5000;
const morgan = require('morgan');
const cors = require('cors')
const router = require('./Router')

dotenv.config();
//Morgan middleware
app.use(express.json());// body-parser
app.use(cors());
app.use(morgan('dev'));


//Router
app.use('/emailTask', router)



app.listen(port, () => {
    console.log(`Server is running on --------------->> ${port}`)

})
