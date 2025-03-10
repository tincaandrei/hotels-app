    const express = require("express");
    const fs = require('fs');
    const cors = require('cors');
    const mongoose = require('mongoose');
    require('dotenv').config();
    const morgan = require('morgan');
    const exp = require("constants");


    const app = express();
    //db connection

    console.log("DB URL: ", process.env.DATABASE);

    mongoose.connect(process.env.DATABASE  )
    .then(()=>console.log("DB Connected"))
    .catch((err) => console.log("DB connection error: ", err));

    //middlewares

    app.use(cors());
    app.use(morgan("dev"));
    //we need middleware to be able to use jason type data recieved 
    app.use(express.json());

    // route middleware
    fs.readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)));

    const port = process.env.PORT || 8000;

    app.listen(port, () => console.log(`Server is running on port ${port}`));