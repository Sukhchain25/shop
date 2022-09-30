const router = require('express').Router();

router.get('/start', (req,res) => {
    res.send('Route crested successfully')
});

module.exports = router;