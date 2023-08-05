var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index', { title: 'Admin Index' });
});

router.get('/login', (req, res) => {
    res.render('admin/login', { title: 'Login' });
});

router.get('/register', (req, res) => {
    res.render('admin/register', { title: 'Register' });
});

module.exports = router;
