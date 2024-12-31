const wordsAndTranslations = [
  { name: 'agua', translate: 'water', fixEspanish: '' },
  { name: 'aguacate', translate: 'avocado', fixEspanish: '' },
  { name: 'aguila', translate: 'eagle', fixEspanish: 'águila' },
  { name: 'alce', translate: 'moose', fixEspanish: '' },
  { name: 'anillo', translate: 'ring', fixEspanish: '' },
  { name: 'araña', translate: 'spider', fixEspanish: '' },
  { name: 'arbol', translate: 'tree', fixEspanish: 'árbol' },
  { name: 'ardilla', translate: 'squirrel', fixEspanish: '' },
  { name: 'armadillo', translate: 'armadillo', fixEspanish: '' },
  { name: 'asno', translate: 'donkey', fixEspanish: '' },
  { name: 'avestruz', translate: 'ostrich', fixEspanish: '' },
  { name: 'avion', translate: 'airplane', fixEspanish: 'avión' },
  { name: 'axolote', translate: 'axolotl', fixEspanish: '' },  

  { name: 'elefante', translate: 'elephant', fixEspanish: '' },
  { name: 'enano', translate: 'dwarf', fixEspanish: '' },
  { name: 'erizo', translate: 'sea ​​urchin', fixEspanish: '' },
  { name: 'escalera', translate: 'ladder', fixEspanish: '' },
  { name: 'escarabajo', translate: 'beetle', fixEspanish: '' },
  { name: 'escorpion', translate: 'scorpion', fixEspanish: 'escorpión' },
  { name: 'escudo', translate: 'shield', fixEspanish: '' },
  { name: 'escuela', translate: 'school', fixEspanish: '' },
  { name: 'espada', translate: 'sword', fixEspanish: '' },
  { name: 'espejo', translate: 'mirror', fixEspanish: '' },
  { name: 'estrella', translate: 'star', fixEspanish: '' },
  { name: 'estrellademar', translate: 'starfish', fixEspanish: 'estrella de m' },
  { name: 'extintor', translate: 'extinguisher', fixEspanish: '' },

  { name: 'iglesia', translate: 'church', fixEspanish: '' },
  { name: 'iglu', translate: 'igloo', fixEspanish: '' },
  { name: 'iguana', translate: 'iguana', fixEspanish: '' },
  { name: 'iman', translate: 'magnet', fixEspanish: '' },
  { name: 'impala', translate: 'impala', fixEspanish: '' },
  { name: 'impresora', translate: 'printer', fixEspanish: '' },
  { name: 'indio', translate: 'indian', fixEspanish: '' },
  { name: 'insectos', translate: 'insects', fixEspanish: '' },
  { name: 'invierno', translate: 'winter', fixEspanish: '' },
  { name: 'inyeccion', translate: 'injection', fixEspanish: 'inyección' },
  { name: 'isla', translate: 'island', fixEspanish: '' },

  { name: 'ocho', translate: 'eight', fixEspanish: '' },
  { name: 'ojo', translate: 'eye', fixEspanish: '' },
  { name: 'ola', translate: 'wave', fixEspanish: '' },
  { name: 'olla', translate: 'pot', fixEspanish: '' },
  { name: 'orangutan', translate: 'orangutan', fixEspanish: 'orangután' },
  { name: 'orca', translate: 'killer whale', fixEspanish: '' },
  { name: 'oreja', translate: 'ear', fixEspanish: '' },
  { name: 'oro', translate: 'gold', fixEspanish: '' },
  { name: 'orquidea', translate: 'orchid', fixEspanish: 'orquídea' },
  { name: 'oruga', translate: 'caterpillar', fixEspanish: '' },
  { name: 'osopanda', translate: 'panda bear', fixEspanish: 'oso panda' },
  { name: 'osopardo', translate: 'grizzly bear', fixEspanish: 'oso pardo' },
  { name: 'ostra', translate: 'oyster', fixEspanish: '' },

  { name: 'uchuva', translate: 'cape gooseberry', fixEspanish: '' },
  { name: 'ukulele', translate: 'ukulele', fixEspanish: '' },
  { name: 'unas', translate: 'nails', fixEspanish: 'uñas' },
  { name: 'unicornio', translate: 'unicorn', fixEspanish: '' },
  { name: 'uniforme', translate: 'uniform', fixEspanish: '' },
  { name: 'unir', translate: 'bind', fixEspanish: '' },
  { name: 'universidad', translate: 'university', fixEspanish: '' },
  { name: 'universo', translate: 'universe', fixEspanish: '' },
  { name: 'uno', translate: 'one', fixEspanish: '' },
  { name: 'urgencias', translate: 'emergencies', fixEspanish: '' },
  { name: 'urna', translate: 'urn', fixEspanish: '' },
  { name: 'urraca', translate: 'magpie', fixEspanish: '' },
  { name: 'utiles', translate: 'useful', fixEspanish: 'útiles' },
  { name: 'uvas', translate: 'grapes', fixEspanish: '' },
];

export function removeAccents(str) {
  return str
    .normalize("NFD") // Separa caracteres base de sus diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
    .replace(/ñ/g, "ñ") // Asegura que las "ñ" no sean modificadas
    .replace(/Ñ/g, "Ñ"); // Asegura que las "Ñ" no sean modificadas
}

export function capitaliceWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getTranslate(word) {
  const wordLowerCase = removeAccents(word.toLowerCase()).replaceAll(' ','');
  const found = wordsAndTranslations.find(item => 
    removeAccents(item.name.toLowerCase()).replaceAll(' ','') === wordLowerCase
  );
  return found ? capitaliceWord(found.translate) : null;
}

export function validateFix(word) {
  const wordLowerCase = word.toLowerCase();
  let valueReturn = null;
  const found = wordsAndTranslations.find(item => item.name.toLowerCase() === wordLowerCase);
  if (found) {
    let value = found.name;
    if (found.fixEspanish != '') {
      value = found.fixEspanish;
    }    
    valueReturn = capitaliceWord(value);
  }
  return valueReturn;
}