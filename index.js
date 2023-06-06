const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
    .connect('mongodb://127.0.0.1/todos',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then(() => console.log('Connection Successful!!!'))
    .catch((err) => console.log(err))

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app is listening on Port 3000');
});
