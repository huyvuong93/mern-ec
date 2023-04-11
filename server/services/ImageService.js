const fs = require('fs');
const multer = require('multer');
const path = require('path');
module.exports = (storageDest) => {
    if (!fs.existsSync(storageDest)) {
      fs.mkdirSync(storageDest, { recursive: true });
    }
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, storageDest);
      },
      filename(req, file, cb) {
        const uniqueSuffix = Math.random().toString(26).substring(4, 10);
        cb(null, `${Date.now()}-${uniqueSuffix}` + path.extname(file.originalname));
      }
    });
    return multer({
      storage: storage,
      fileFilter(req, file, cb) {
        console.log(file.mimetype);
        const allowList = [
          'image/png',
          'image/jpeg',
          'image/jpg',
        ];
        if (!allowList.includes(file.mimetype)) {
          return cb(new Error('file is not allowed'))
        }
        cb(null, true)
      }
    });
}