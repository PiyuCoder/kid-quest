export const quizIndexGenerator = (arr) => {
  let indexQuiz = [];
  for (let i = 2; i < arr.length; i += 3) {
    indexQuiz.push(i);
    if (i === arr.length - 2) {
      indexQuiz.push(i + 1);
    }
  }

  return indexQuiz;
};

//Number
export const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Color

export const colorsArr = [
  "red",
  "green",
  "yellow",
  "blue",
  "black",
  "purple",
  "orange",
  "white",
  "pink",
  "brown",
  "maroon",
  "cyan",
];

//speak
export const speak = (data) => {
  const utterance = new SpeechSynthesisUtterance(
    data
    // alphData[currentIndex]?.letter
  );
  utterance.rate = 0.4;

  speechSynthesis.speak(utterance);
};

// const speakName = () => {
//   const utterance = new SpeechSynthesisUtterance(
//     alphData[currentIndex]?.image.split(".")[0]
//   );
//   utterance.rate = 0.4;

//   // // Get the voices
//   // const voices = window.speechSynthesis.getVoices();

//   // // Choose a voice (you can change the index to choose a different voice)
//   // const selectedVoice = voices[];

//   // // Set the chosen voice
//   // utterance.voice = selectedVoice;

//   speechSynthesis.speak(utterance);
// };
