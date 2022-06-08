const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${path.basename(req.body.name)}${path.extname(file.originalname)}`)
    }
})

module.exports = multer({
    storage: storage,
    limits: { fileSize: '6000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null, true)
        }
        cb("Give proper files format")
    }
}).single('image');
