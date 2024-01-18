const multer = require("multer");

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
			cb(null, "../../api_profissionais_adm/web/static/img_categorias");
            cb(null, "../../api_profissionais/web/static/img_categorias");
            //cb(null, "../api_durafix/prof/dist/img_categorias");
			// cb(null, "../prof/static/img_categorias");
			//cb(null, '../api_durafix/prof/dist/img_categorias')
        },
        filename: (req, file, cb) => {
            //cb(null, file.originalname);
            cb(null, Date.now().toString() + "_" + file.originalname);
        },
    }),
});