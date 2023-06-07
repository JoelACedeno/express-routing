const express = require("express");
const app = express();
const ExpressError = require('./expressError')
const { convertNumsArr, findMean, findMedian, findMode } = require("./functions");


/* 
/mean?nums=1,3,5,7. looks like: 
{
    "nums": [1, 3, 5, 7]
}
*/


/** route handler for '/mean' */
app.get('/mean', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError("Please pass a query key of nums with a list of numbers separated by commas.", 400)
    }
    let numsToString = req.query.nums.split(',');
    
    let nums = convertNumsArr(numsToString);
    if (nums instanceof Error){
        throw new ExpressError(nums.message)
    }

    let result = {
        operation: "mean",
        result: findMean(nums)
    }
    
    return res.send(result);
})


/** route handler for '/median' */
app.get('/median', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError("Please pass a query key of nums with a list of numbers separated by commas.", 400)
    }
    let numsToString = req.query.nums.split(',');
    let nums = convertNumsArr(numsToString);

    let result = {
        operation: "median",
        result: findMedian(nums)
    }

    return res.send(result);
})


/** route handler for '/mode' */
app.get('/mode', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError("Please pass a query key of nums with a list of numbers separated by commas.", 400)
    }
    let numsToString = req.query.nums.split(',');
    let nums = convertNumsArr(numsToString);

    let result = {
        operation: "mode",
        result: findMode(nums)
    }

    return res.send(result);
})


/** 404 error handler */
app.use(function (req, res, next){
    const err = new ExpressError("Not Found", 404);
    
    //pass to next piece of middleware
    return next(err)
})

/** general error handler */
app.use(function (err, req, res, next){
    res.status(err.status|| 500);

    return res.json({
        error: err,
        message: err.message
    });
});

/** start server */
app.listen(3000, function(){
    console.log('App started on port 3000');
  })