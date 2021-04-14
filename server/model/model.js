const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, subject: {
        type: String,
        required: true
    }, message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

const blog = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, title: {
        type: String,
        required: true
    }, subject: {
        type: String,
        required: true
    }, article: {
        type: String,
        required: true
    }, uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, imgID: {
        type: String
    }, link: {
        type: String,
        required: true
    }, time: {
        type: Date,
        required: true
    },

})
const testimoniesModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, review: {
        type: String,
        required: true
    }, usernameImg: {
        type: String,
    }, imgID: {
        type: String,
    }, uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, time: {
        type: Date,
        required: true
    },
})
const skillModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true
    }
})
const servicesModel = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    iconID: {
        type: String
    }
});
exports.contactDB = mongoose.model('Contact', contactSchema);
exports.blogs = mongoose.model('blog', blog);
exports.testimonies = mongoose.model('testimonies', testimoniesModel);
exports.skills = mongoose.model('skills', skillModel);
exports.services = mongoose.model('services', servicesModel);
