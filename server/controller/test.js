let cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'djzamwnns',
    api_key: '655614134981771',
    api_secret: 'TtUAUqXYFJApKuDiYf8Bpo_KKNc'
});
exports.img = (req, res) => cloudinary.v2.uploader.upload("public/assets/sport.png", {folder: 'profile'},
    function (error, result) {
        console.log(result, error)
        res.send(result)
    });

