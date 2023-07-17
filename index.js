'use strict';

let voices = [];
const synth = window.speechSynthesis;
// console.log(synth.pause);
let voiceselect = document.getElementById('voice-select');
let mainbtn = document.getElementById('submit-btn');
let rate = document.getElementById('rate');
let rateValue = document.getElementById('rate-value');
let pitch = document.getElementById('pitch');
let pitchValue = document.getElementById('pitch-value');
let body = document.querySelector('body');
let speaking;

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceselect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  // mainbtn.textContent = 'Pause';

  let userinput = document.getElementById('text-input').value;

  // console.log(synth.resume);

  if (synth.speaking) {
    return;
  }

  if (userinput !== '') {
    body.style.background = 'url(/back3.gif)';
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center center';

    speaking = new SpeechSynthesisUtterance(userinput);

    speaking.onend = (e) => {
      body.style.background = `linear-gradient(to right, #0acffe 0%, #495aff 100%)`;
      mainbtn.textContent = 'Convert to Speech';
    };

    speaking.onerror = (e) => {
      console.log('Something Went wrong');
    };

    let selectvoice = voiceselect.selectedOptions[0].getAttribute('data-name');

    voices.forEach((voice) => {
      if (voice.name === selectvoice) {
        speaking.voice = voice;
      }
    });

    speaking.rate = rate.value;
    speaking.pitch = pitch.value;

    synth.speak(speaking);
  }

};


mainbtn.addEventListener('click', () => {
  speak();
  if (mainbtn.textContent == 'Convert to Speech') {
    mainbtn.textContent = 'Pause';
    mainbtn.addEventListener('click', () => {
      synth.pause();
        body.style.background = `linear-gradient(to right, #0acffe 0%, #495aff 100%)`;
        // speechSynthesis.pause();
      })
    } else if (mainbtn.textContent == 'Pause') {
      mainbtn.textContent = 'Resume';
      mainbtn.addEventListener('click', () => {
        synth.resume();
        body.style.background = 'url(/back3.gif)';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        // speechSynthesis.pause();
      });
    }else if (mainbtn.textContent == 'Resume') {
      mainbtn.textContent = 'Pause';
      mainbtn.addEventListener('click', () => {
        synth.pause();
        body.style.background = `linear-gradient(to right, #0acffe 0%, #495aff 100%)`;
        // speechSynthesis.pause();
      });
    }else{
      mainbtn.textContent = 'Resume';
      mainbtn.addEventListener('click', () => {
        synth.resume();
        body.style.background = 'url(/back3.gif)';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        // speechSynthesis.pause();
      });
    }
    mainbtn.textContent == 'Convert to Speech';
});
