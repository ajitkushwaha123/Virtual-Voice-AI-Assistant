import React, { useEffect, useState } from 'react';
import ai from '../assets/ai.gif';
import { FaMicrophone } from "react-icons/fa";

const Hero = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [content, setContent] = useState('Speak');
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isActivated) {
      speak("Activating inertia");
      speak("Going Online");
      wishMe();
    }
  }, [isActivated]);

  const activate = () => {
    setIsActivated(true);
  }

  const speak = (sentence) => {
    const textToSpeak = new SpeechSynthesisUtterance(sentence);
    textToSpeak.rate = 1;
    textToSpeak.pitch = 1;
    window.speechSynthesis.speak(textToSpeak);
  }

  const wishMe = () => {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
      speak("Good Morning Boss");
    } else if (hour === 12) {
      speak("Good Noon Boss");
    } else if (hour > 12 && hour <= 17) {
      speak("Good Afternoon Boss");
    } else {
      speak("Good Evening Boss");
    }
  }

  const voiceRecognisation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setContent("Listening...");
    const recognition = new SpeechRecognition();
    recognition.onstart = function(){
      console.log("start");
    }

    recognition.onend = function(){
      console.log("end");
    }
  }

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setContent("Listening...");
      const recognition = new SpeechRecognition();
      recognition.start();
  
      recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setContent(transcript);
        speakThis(transcript.toLowerCase());
      };
    } else {
      console.log("Speech Recognition API not supported");
    }
  };
  
  const speakThis = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I didn't understand what you said. Please speak again.";

    if (message.includes('hey') || message.includes('hello')) {
      speech.text = "Hello Boss";
    }
    else if(message.includes('how are you'))
    {
        const finalText = "I am fine boss ! how can i help you";
        speech.text = finalText;
    }
    else if(message.includes('name'))
    {
        const finalText = "My Name is Inertia";
        speech.text = finalText;
    }
    else if(message.includes('open Google'))
    {
        const finalText = "Opening Google";
        window.open("https:google.com" , "_blank");
        speech.text = finalText;
    }
    else {
      window.open(`https://www.google.com/search?=${message.replace(" ", "+")}`, "_blank");
      speech.text = `I found some information for ${message} on Google`;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="text-red-500">
        <img width={"350px"} src={ai} alt="" />
      </div>
      <h1 className="text-[#54BBFE] text-[40px] font-bold mt-[-20px]">I N E R T I A</h1>
      {isActivated ? (
  <button onClick={startSpeechRecognition} className="bg-gray-500 flex justify-center items-center w-[320px] md:w-[500px] px-5 text-white py-2 rounded-full font-normal text-[16px] mt-7">
    <FaMicrophone />
    <span className="ml-2">{content}</span>
  </button>
) : (
  <button onClick={activate} className="bg-gray-500 flex justify-center items-center w-[320px] md:w-[500px] px-5 text-white py-2 rounded-full font-normal text-[16px] mt-7">
    <FaMicrophone />
    <span className="ml-2">Activate</span>
  </button>
)}

    </div>
  );
};

export default Hero;
