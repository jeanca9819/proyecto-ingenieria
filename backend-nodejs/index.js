const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const multer = require('multer');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));

/* INICIO EVIDENCIA */

const storage = multer.diskStorage({
  destination: './src/assets/',
  filename: function(req, file, cb){
      cb(null, file.originalname)
  }        
})

const upload = multer({storage: storage})
app.use(cors());
app.post('/', upload.single('file'), (req, res) => {})

/* FINAL EVIDENCIA */

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Inicio del BackEnd" });
});

app.use(require('./src/routes/Router'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

