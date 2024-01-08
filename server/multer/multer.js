import multer from "multer";

//Alphabet storage
const alphImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images/Alphabets");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//Animal Storage
const animalImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images/Animals");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//Alphabet Middleware
export const uploadAlphMiddleware = multer({
  storage: alphImgStorage,
});

//Animal Middleware
export const uploadAnimalMiddleware = multer({
  storage: animalImgStorage,
});

const alphNumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images/Alphabets");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadNumMiddleware = multer({
  storage: alphNumStorage,
});
