export default class TextToSpeech {
  constructor() {
    // Inicializa una instancia de SpeechSynthesis
    this.synth = window.speechSynthesis;
  }

  speak(text, languageOption = 1) {
    return new Promise((resolve, reject) => {
      if (this.synth.speaking) {
        this.synth.cancel();
      }
      
      if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        const lang = languageOption === 1 ? 'en-US' : 'es-ES';
        const rate = languageOption === 1 ? 0.6 : 0.85;
        utterance.lang = lang;
        utterance.rate = rate; // Configura la velocidad de habla              
        utterance.pitch = 1;      // Configura el tono de la voz

        const voices = this.synth.getVoices();
        const voice = voices.find(v => v.lang === lang);
        if (voice) {
          utterance.voice = voice; // Asigna la voz si está disponible
        } else {
          reject(`No hay voz disponible para el idioma ${lang}`);
          return;
        }

        // Evento que se dispara al terminar de hablar
        utterance.onend = () => resolve();

        // Evento que se dispara si hay un error al hablar
        utterance.onerror = (event) => { console.log(event.error);reject(event.error)};

        // Inicia la síntesis de voz
        this.synth.speak(utterance);
      } else {
        // Si el texto está vacío, rechazamos la promesa
        reject('Texto vacío, no se puede hablar.');
      }
    });
  }

  cancel() {
    // Método para detener cualquier síntesis en curso
    if (this.synth.speaking) {
        this.synth.cancel();
    }
  }
  delay(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
}
