const path = require('path');

exports.getContact = (req, res, next) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'contact-us.html'));
}

exports.postContact = (req, res, next) => {
    res.redirect('/admin/success');
}

exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(__dirname,'..','views','success.html'))
}