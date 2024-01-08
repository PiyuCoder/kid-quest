import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const uploadAlphImgApi = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/uploadAlphImg`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const uploadNumImgApi = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/uploadNumImg`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const uploadAnimalImgApi = async (formData) => {
  console.log(formData);
  try {
    const res = await axios.post(`${url}/api/uploadAnimalImg`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getAlphImgApi = async () => {
  try {
    const res = await axios.get(`${url}/api/getAlphImg`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getNumImgApi = async () => {
  try {
    const res = await axios.get(`${url}/api/getNumImg`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getQuizData = async (category) => {
  try {
    const res = await axios.get(`${url}/api/getQuiz?category=${category}`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getUserQuiz = async (category, token) => {
  try {
    const res = await axios.get(`${url}/api/getUserQuiz?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const loginApi = async (phone, password) => {
  try {
    const res = await axios.post(`${url}/api/login`, { phone, password });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const registerApi = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/register`, {
      formData,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const submitAnswer = async (answer, token, qId) => {
  try {
    const res = await axios.post(
      `${url}/api/submitAnswer`,
      { answer, qId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateCurrentIndexApi = async (token, category, currentIndex) => {
  try {
    const res = await axios.post(
      `${url}/api/updateIndex`,
      { category, currentIndex },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getUserData = async (token) => {
  try {
    const res = await axios.get(
      `${url}/api/user`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const resetSectionApi = async (token, category) => {
  try {
    const res = await axios.post(
      `${url}/api/reset`,
      { category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};
