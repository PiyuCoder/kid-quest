import React, { useState } from "react";
import {
  uploadAlphImgApi,
  uploadAnimalImgApi,
  uploadNumImgApi,
} from "../api/axios";

export default function Admin() {
  const [alphImg, setAlphImg] = useState();
  const [alphLetter, setAlphLetter] = useState("");

  const [numImg, setNumImg] = useState();
  const [num, setNum] = useState(0);

  const [animalImg, setAnimalImg] = useState();
  const [animal, setAnimal] = useState("");

  const uploadAlphImg = async () => {
    const formData = new FormData();
    formData.append("file", alphImg);
    formData.append("letter", alphLetter);
    const res = await uploadAlphImgApi(formData);
    console.log(res);
  };

  const uploadNumImg = async () => {
    const formData = new FormData();
    formData.append("file", numImg);
    formData.append("letter", num);
    const res = await uploadNumImgApi(formData);
    console.log(res);
  };

  const uploadAnimalImg = async () => {
    const formData = new FormData();
    formData.append("file", animalImg);
    formData.append("letter", animal);
    const res = await uploadAnimalImgApi(formData);
    console.log(animalImg, animal);
  };
  return (
    <>
      <div style={{ marginTop: "15rem" }}>
        <label>Alphabet Section:</label>
        <input type="file" onChange={(e) => setAlphImg(e.target.files[0])} />
        <input
          type="text"
          value={alphLetter}
          onChange={(e) => setAlphLetter(e.target.value)}
        />
        <button onClick={uploadAlphImg}>Upload Alphabet</button>
      </div>

      <div>
        <label>Number Section:</label>
        <input type="file" onChange={(e) => setNumImg(e.target.files[0])} />
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button onClick={uploadNumImg}>Upload Number</button>
      </div>

      <div>
        <label>Animal Section:</label>
        <input type="file" onChange={(e) => setAnimalImg(e.target.files[0])} />
        <input
          type="text"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        />
        <button onClick={uploadAnimalImg}>Upload Animal</button>
      </div>
    </>
  );
}
