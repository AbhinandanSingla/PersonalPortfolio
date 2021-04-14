const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');
const controller1 = require('../controller/test');
const axios = require('axios')
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/admin/contactus', (req, res) => {
    axios.get(`http://${req.headers.host}/api/contactus/`
    ).then(data => {
        console.log(data.data)
        res.render('admin/contact', {
            contact: data.data
        })
    })
})

router.get('/admin/blog', (req, res) => {
    axios.get(`http://${req.headers.host}/api/blogs/`
    ).then(data => {
        console.log(data.data)
        res.render('admin/blog', {
            contact: data.data
        })
    })
})

//api

router.post('/api/contactus/', controller.contactADD);
router.get('/api/contactus/', controller.getContacts);
router.delete('/api/contactus/:id', controller.deleteContact);
router.get('/api/blogs/', controller.getAllBlog);
router.post('/api/blog/', controller.addBlog);
router.delete('/api/blog/:id', controller.deleteBlog);
router.get('/api/testimonies/', controller.getTestimonies);
router.get('/api/skills/', controller.getSkills);
router.get('/api/img/', controller1.img);
module.exports = router;