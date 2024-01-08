import mongoose from "mongoose";

const alphabetSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const animalSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Alphabet = mongoose.model("Alphabet", alphabetSchema);

export const Animal = mongoose.model("Animal", animalSchema);
