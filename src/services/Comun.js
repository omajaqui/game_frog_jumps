export default class Comun {
  constructor() {    
  }

  delay(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
}