const {contactDB, blogs, testimonies, skills} = require('../model/model');
const mongoose = require('mongoose');

exports.contactADD = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    const contact = new contactDB({
        name: nameCapitalized,
        email: email,
        subject: subject,
        message: message,
        time: Date.now()
    });
    contact.save(contact).then(data => {
        res.redirect('/#contact')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creation operation"
        });

    });
}
exports.getContacts = (req, res) => {
    contactDB.find().then(data => res.status(200).send(data));
}
exports.deleteContact = (req, res) => {
    const id = req.params.id;
    contactDB.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
        } else {
            res.send({
                message: "Contact was deleted successfully!"
            })
        }
    })
}
exports.getAllBlog = (req, res) => {
    blogs.find().then(data => {
        if (!data) {
            res.status(404).send({message: "Not found contact with id "})
        } else {
            res.send(data)
        }
    })
        .catch(err => res.status(500).send({message: "Error retrieving contact with id "}))
}
exports.addBlog = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const name = req.body.name;
    const title = req.body.title;
    const subject = req.body.subject;
    const article = req.body.article;
    const link = ''
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    const blog = new blogs({
        username: nameCapitalized,
        title: title,
        subject: subject,
        article: article,
        uid: mongoose.Types.ObjectId(),
        link: 'f',
        time: Date.now()
    })
    blog.save(blog).then(data => {
        res.status(200).send('successfully added')
    })
}
exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    blogs.findByIdAndDelete(id).then(data => {
        res.status(200).send('Deleted Successfully')
    })
}
exports.getTestimonies = (req, res) => {
    const addi = new testimonies({
        username: 'Abhinandan',
        review: 'lorem22',
        usernameImg: '',
        uid: mongoose.Types.ObjectId(),
        time: Date.now()
    })
    // addi.save(addi).then(data => console.log(data));
    testimonies.find().then(data => {
        if (!data) {
            res.status(404).send({message: "Not found contact with id "})
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({message: "Error retrieving contact with id "})
    });
}
exports.getSkills = (req, res) => {

    skills.find().then(data => {
        if (!data) {
            res.status(404).send({message: "Not found contact with id "})
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({message: "Error retrieving contact with id "})
    });
}
exports.addSkill = (req, res) => {
    const name = req.body.name;
    const percentage = req.body.percentage;
    let addi = new skills({
        name: name,
        progress: percentage
    })
    addi.save(addi).then(data => res.send(data));
}
exports.deleteSkill = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        skills.findByIdAndDelete(id).then(data => {
            console.log('skill deleted');
            res.send('deleted')
        })
    } else {
        skills.deleteMany().then(data => {
            res.send('deleted')
        })
    }

}