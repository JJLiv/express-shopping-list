const express = require("express");
const ExpressError = require("./expressError");
const middleware = require("./middleware");
const morgan = require("morgan");
const ExpressError = require("./expressError");


const shoppingRoutes = require("./shoppingRoutes");


const app = express();

app.use(express.json());
//app.use(middleware.logger);
app.use(morgan('dev'));

app.use("/shoppingRoutes", shoppingRoutes);



app.use(function(req, res, next) {
    return new ExpressError("Not Found", 404);
});


app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});




app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});