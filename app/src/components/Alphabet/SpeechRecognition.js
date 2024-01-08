import React, { useState, useEffect } from "react";

const AlphabetSpeechRecognition = ({ alphData, currentIndex }) => {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognitionInstance = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      recognitionInstance.lang = "en-IN";
      recognitionInstance.interimResults = false;

      // Check if the browser supports the WebKit prefix
      const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;

      const grammar =
        "#JSGF V1.0; grammar letters; public <letter> = A | B | C | D | ... ;";
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognitionInstance.grammars = speechRecognitionList;

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        console.log("Spoken text:", spokenText);

        // Check if the spoken text matches any expected letter
        const expectedAlphabet = alphData[currentIndex]?.letter.toLowerCase();
        if (expectedAlphabet?.includes(spokenText)) {
          console.log("Correct pronunciation!");
        } else {
          console.log("Incorrect pronunciation.");
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }, [setRecognition]);

  const startSpeechRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <div>
      <button onClick={startSpeechRecognition}>Start Speaking</button>
    </div>
  );
};

export default AlphabetSpeechRecognition;
