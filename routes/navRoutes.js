const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Main Route On'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            message: error
        });
    }
});

module.exports = router;