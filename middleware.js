

function logger(req, res, next){
    console.log(`Sending ${req.method} request tp ${req.path}.`);
    return next();
};


module.exports = { logger };