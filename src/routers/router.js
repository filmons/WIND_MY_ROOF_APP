const express = require('express');
const userRouter = require('./user_router');
const router = express.Router();

router.use(userRouter);

router.use('*' ,(request, response) => {
    response.status(400).json({
        message:'this rout is not found'
    })
})

module.exports = router;
