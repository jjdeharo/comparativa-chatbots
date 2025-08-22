// Calificaciones de puntuación
const ratings = ["Básico", "Regular", "Correcto", "Bueno", "Excelente"];

// Textos de la interfaz (español - idioma de la hoja de cálculo)
const texts = {
  'title': 'Selección de chatbots gratuitos',
  'assign_importance': 'Asignar importancia',
  'reset': '↺ Restaurar',
  'results': 'Resultados',
  'note': 'Nota: Esta calificación es subjetiva y puede variar según las necesidades específicas de cada usuario.',
  'question': '¿Qué IA me conviene? Comparativa de chatbots'
};

// Etiquetas para los deslizadores (rango 0..4)
const sliderLabels = ["Sin importancia", "Baja", "Media", "Alta", "Obligatorio"];

// Etiquetas para el deslizador de edad (rango 0..1)
const ageSliderLabels = ["Indiferente", "Menores"];

// URL del CSV de Google Sheets
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvMggc_JmnjwFTlG5K-6Q5Dtd9V_2Au9ScA5dSkilti8ptFGvpoiT_TbIC196juHZDR1112kZzbgwO/pub?output=csv";

// Variables globales para datos dinámicos del CSV
let ias = [];
let capabilities = {};
let csvFeatures = [];

// Datos por defecto (fallback) - datos actuales del CSV 22/08/2025
const fallbackIas = [
  "Gemini",
  "Grok", 
  "ChatGPT",
  "Le Chat",
  "Perplexity",
  "Qwen",
  "Kimi",
  "Copilot",
  "Claude",
  "DeepSeek",
  "Phind",
  "Lumo"
];

const fallbackCapabilities = {
  "Gemini":      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 14],
  "Grok":        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 13],
  "ChatGPT":     [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 14],
  "Le Chat":     [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 13],
  "Perplexity":  [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 13],
  "Qwen":        [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 18],
  "Kimi":        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 14],
  "Copilot":     [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 14],
  "Claude":      [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 18],
  "DeepSeek":    [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 14],
  "Phind":       [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14],
  "Lumo":        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 13]
};

// Función para cargar datos desde CSV
async function loadDataFromCSV() {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 5) {
      throw new Error('CSV no tiene suficientes datos (necesita al menos 5 filas)');
    }

    // Fila 3 (índice 2) contiene los nombres de los chatbots desde la columna C (índice 2)
    const chatbotRow = lines[2].split(',').map(h => h.trim().replace(/"/g, ''));
    ias = chatbotRow.slice(2).filter(name => name); // Desde columna C, filtrar nombres vacíos
    
    console.log('Chatbots encontrados:', ias);
    
    // Resetear datos globales
    capabilities = {};
    csvFeatures = [];
    
    // Primero recopilar todas las características válidas
    const validRows = [];
    for (let rowIndex = 3; rowIndex < lines.length; rowIndex++) {
      const values = lines[rowIndex].split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length < 3) continue;
      
      const featureName = values[1];
      if (!featureName || featureName.toLowerCase().includes('puntuación')) continue;
      
      validRows.push({ rowIndex, values, featureName });
      csvFeatures.push(featureName);
    }
    
    // Ahora procesar cada fila sabiendo cuál es la última
    validRows.forEach((row, index) => {
      const { values, featureName } = row;
      const isLastFeature = (index === validRows.length - 1); // Última característica válida
      
      
      // Datos desde columna C (índice 2) hacia la derecha
      const featureData = values.slice(2);
      
      // Asignar datos a cada chatbot
      ias.forEach((chatbot, chatbotIndex) => {
        if (!capabilities[chatbot]) {
          capabilities[chatbot] = [];
        }
        
        // Convertir valor a número
        let value = 0;
        if (featureData[chatbotIndex]) {
          const cellValue = featureData[chatbotIndex].trim().toLowerCase();
          
          if (isLastFeature) {
            // Para edad: <18 = 1, >=18 = 0
            const ageNum = parseFloat(featureData[chatbotIndex]);
            value = (!isNaN(ageNum) && ageNum < 18) ? 1 : 0;
          } else {
            // Para otras características: Sí/No a 1/0
            if (cellValue === 'sí' || cellValue === 'si' || cellValue === 'yes' || cellValue === '1') {
              value = 1;
            } else if (cellValue === 'no' || cellValue === '0') {
              value = 0;
            } else {
              // Intentar conversión numérica directa
              const num = parseFloat(featureData[chatbotIndex]);
              value = isNaN(num) ? 0 : num;
            }
          }
        }
        
        capabilities[chatbot].push(value);
      });
    });
    
    console.log('Datos cargados desde CSV:', { 
      ias: ias.length, 
      features: csvFeatures.length,
      sampleCapabilities: capabilities[ias[0]]?.length || 0
    });
    
    return true;
    
  } catch (error) {
    console.warn('Error al cargar CSV, usando datos por defecto:', error);
    // Usar datos fallback
    ias = [...fallbackIas];
    capabilities = { ...fallbackCapabilities };
    csvFeatures = [
      "Con personalización de las respuestas",
      "Generación de imágenes", 
      "Generación de video",
      "Intérprete de código",
      "Compartir públicamente conversaciones completas",
      "Subir documentos de texto",
      "Puede ver las imágenes de los PDF",
      "Cálculos matemáticos exactos mediante programación",
      "Con modo de razonamiento",
      "Con búsqueda profunda",
      "Con chat privado (incógnito)",
      "Creación de agentes (espacios de trabajo)",
      "Con canvas (lienzo)",
      "Conexión con otros servicios (Google Drive, Dropbox, etc.)",
      "Versión CLI (consola o terminal)",
      "Edad mínima de uso"
    ];
    return false;
  }
}

// Inicialmente, los deslizadores a 2 (Media) excepto el último (edad) a 0 (Indiferente)
let weights = [];

// Devuelve true si alguna característica obligatoria falla
function failsMandatoryRequirement(iaCapabilities) {
  for (let i = 0; i < weights.length - 1; i++) {
    if (weights[i] === 4 && iaCapabilities[i] === 0) {
      return true;
    }
  }
  return false;
}

// Crea los sliders de cada característica usando datos dinámicos del CSV
function createFeatureSliders() {
  const container = document.getElementById('features');
  if (!container) return;

  // Usar características del CSV si están disponibles, sino usar traducciones por defecto
  const featuresArr = csvFeatures.length > 0 ? csvFeatures : translations[currentLang].features;
  
  // Inicializar weights si no está inicializado
  if (weights.length === 0) {
    weights = Array(featuresArr.length).fill(2);
    if (featuresArr.length > 0) {
      weights[featuresArr.length - 1] = 0; // Último elemento (edad) a 0
    }
  }
  
  container.innerHTML = featuresArr.map((feature, index) => {
    // Determinar si es el slider de edad (último elemento)
    const isAgeSlider = (index === featuresArr.length - 1);
    
    if (!isAgeSlider) {
      const label = sliderLabels[2]; // "Media"
      return `
        <div class="feature-item">
          <div class="feature-header">
            <label class="feature-label">${feature}</label>
            <span class="weight-value" id="weight-${index}">${label}</span>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value="2"
            class="slider"
            id="slider-${index}"
            onInput="updateWeight(${index}, this.value)"
          >
        </div>
      `;
    } else {
      const label = ageSliderLabels[0]; // "Indiferente"
      return `
        <div class="feature-item">
          <div class="feature-header">
            <label class="feature-label">${feature}</label>
            <span class="weight-value" id="weight-${index}">${label}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            value="0"
            class="slider"
            id="slider-${index}"
            onInput="updateWeight(${index}, this.value)"
          >
        </div>
      `;
    }
  }).join('');
}

// Actualiza los textos de la interfaz
function updateInterfaceTexts() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    if (texts[key]) {
      el.textContent = texts[key];
    }
  });
  
  const footerNote = document.querySelector('.footer div');
  const footerLink = document.querySelector('.footer a');
  if (footerNote) footerNote.textContent = texts.note;
  if (footerLink) {
    footerLink.textContent = texts.question;
    footerLink.href = "https://educacion.bilateria.org/que-ia-me-conviene-comparativa-de-chatbots";
  }
}


// Función para obtener el color del slider basado en el valor
function getSliderColor(value) {
  const colors = {
    0: "#9ca3af", // Gris - Sin importancia
    1: "#10b981", // Verde - Baja
    2: "#3b82f6", // Azul - Media
    3: "#f59e0b", // Naranja - Alta
    4: "#ef4444"  // Rojo - Obligatorio
  };
  return colors[value];
}

// Actualiza el valor de un deslizador
function updateWeight(index, value) {
  let label;
  const featuresLength = csvFeatures.length > 0 ? csvFeatures.length : 0;
  
  if (index < featuresLength - 1) {
    label = sliderLabels[value];
  } else {
    label = ageSliderLabels[value];
  }
  weights[index] = parseInt(value);
  document.getElementById(`weight-${index}`).textContent = label;

  const sliderEl = document.getElementById(`slider-${index}`);
  if (index < featuresLength - 1) {
    sliderEl.style.setProperty("--slider-thumb-color", getSliderColor(value));
  } else {
    sliderEl.style.setProperty("--slider-thumb-color", "#3b82f6");
  }
  updateScores();
}

// Restablece todos los deslizadores a sus valores por defecto
function resetWeights() {
  const featuresLength = csvFeatures.length > 0 ? csvFeatures.length : 0;
  weights = Array(featuresLength).fill(2);
  if (featuresLength > 0) {
    weights[featuresLength - 1] = 0; // Último elemento (edad) a 0
  }
  document.querySelectorAll('.slider').forEach((slider, index) => {
    if (index < featuresLength - 1) {
      slider.value = 2;
      document.getElementById(`weight-${index}`).textContent = sliderLabels[2]; // "Media"
      slider.style.setProperty("--slider-thumb-color", getSliderColor(2));
    } else {
      slider.value = 0;
      document.getElementById(`weight-${index}`).textContent = ageSliderLabels[0]; // "Indiferente"
      slider.style.setProperty("--slider-thumb-color", "#3b82f6");
    }
  });
  updateScores();
}

// Calcula el color de la puntuación en función del porcentaje
function getScoreColor(percentage) {
  if (percentage >= 80) return 'score-green';
  if (percentage >= 60) return 'score-blue';
  if (percentage >= 40) return 'score-yellow';
  if (percentage >= 20) return 'score-orange';
  return 'score-red';
}

// Calcula la puntuación total para cada IA
function updateScores() {
  if (ias.length === 0 || Object.keys(capabilities).length === 0) {
    console.warn('No hay datos de chatbots disponibles');
    return;
  }
  
  
  const scores = ias.map(ia => {
    if (!capabilities[ia]) {
      console.warn(`No hay datos para el chatbot: ${ia}`);
      return { ia, score: 0 };
    }
    
    let baseScore = 0;
    for (let i = 0; i < weights.length - 1; i++) {
      if (capabilities[ia][i] !== undefined) {
        baseScore += capabilities[ia][i] * weights[i];
      }
    }
    
    if (failsMandatoryRequirement(capabilities[ia])) {
      return { ia, score: 0 };
    }
    
    // Manejo del bonus por edad - el último elemento ya está convertido a 0/1
    let ageBonus = 0;
    const ageIndex = capabilities[ia].length - 1;
    const ageWeightIndex = weights.length - 1;
    const isUnder18 = capabilities[ia][ageIndex] === 1; // Ya convertido: 1 = <18, 0 = >=18
    
    if (weights[ageWeightIndex] === 0) {
      // Indiferente - dar bonus si es apto para menores
      ageBonus = isUnder18 ? 1 : 0;
    } else if (weights[ageWeightIndex] === 1) {
      // Solo menores - solo dar bonus si es <18, sino descalificar
      if (isUnder18) {
        ageBonus = 1;
      } else {
        baseScore = 0; // Descalificar completamente
        ageBonus = 0;
      }
    }
    
    baseScore += ageBonus;
    
    
    return { ia, score: Math.round(baseScore) };
  }).sort((a, b) => b.score - a.score);

  const container = document.getElementById('results');
  if (!container) return;

  container.innerHTML = scores.map(({ ia, score }, index) => {
    // Calcular puntuación máxima posible
    let maxPossibleScore = 0;
    
    // Sumar pesos de todas las características (excepto edad)
    for (let i = 0; i < weights.length - 1; i++) {
      maxPossibleScore += weights[i] * 1; // Cada característica puede valer máximo 1
    }
    
    // Añadir el bonus de edad (siempre máximo 1)
    maxPossibleScore += 1;
    
    const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
    const colorClass = getScoreColor(percentage);
    
    // Determinar la calificación textual
    let ratingIndex, ratingClass;
    if (percentage >= 80) {
      ratingIndex = 4; // Excelente
      ratingClass = "rating-excellent";
    } else if (percentage >= 60) {
      ratingIndex = 3; // Bueno
      ratingClass = "rating-good";
    } else if (percentage >= 40) {
      ratingIndex = 2; // Correcto
      ratingClass = "rating-average";
    } else if (percentage >= 20) {
      ratingIndex = 1; // Regular
      ratingClass = "rating-fair";
    } else {
      ratingIndex = 0; // Básico
      ratingClass = "rating-poor";
    }
    const ratingText = ratings[ratingIndex];
    
    return `
      <div class="result-item">
        <span class="rank">#${index + 1}</span>
        <span class="ia-name">${ia}</span>
        <div class="score-container">
          <div class="score-bar">
            <div class="score-fill score-fill-${colorClass.replace('score-', '')}" style="width: ${percentage}%"></div>
          </div>
          <div class="score-value">${percentage}%</div>
          <div class="score-rating ${ratingClass}">${ratingText}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Función de inicialización que carga datos y configura la interfaz
async function initializeApp() {
  console.log('Inicializando aplicación...');
  
  // Cargar datos desde CSV
  const csvLoaded = await loadDataFromCSV();
  if (csvLoaded) {
    console.log('Datos cargados desde CSV exitosamente');
  } else {
    console.log('Usando datos por defecto como fallback');
  }
  
  // Inicializar weights basado en los datos cargados
  const featuresLength = csvFeatures.length > 0 ? csvFeatures.length : 0;
  weights = Array(featuresLength).fill(2);
  if (featuresLength > 0) {
    weights[featuresLength - 1] = 0; // Último elemento (edad) a 0
  }
  
  // Configurar interfaz
  updateInterfaceTexts();
  createFeatureSliders();
  updateScores();
  
  console.log('Aplicación inicializada con', ias.length, 'chatbots y', featuresLength, 'características');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);

// Función para recargar datos desde el CSV (útil para testing o actualizaciones manuales)
async function reloadDataFromCSV() {
  console.log('Recargando datos desde CSV...');
  const csvLoaded = await loadDataFromCSV();
  
  if (csvLoaded) {
    console.log('Datos recargados exitosamente');
    // Reinicializar la interfaz con los nuevos datos
    const featuresLength = csvFeatures.length > 0 ? csvFeatures.length : translations[currentLang].features.length;
    weights = Array(featuresLength).fill(2);
    if (featuresLength > 0) {
      weights[featuresLength - 1] = 0;
    }
    
    createFeatureSliders();
    updateScores();
    console.log('Interfaz actualizada con', ias.length, 'chatbots y', featuresLength, 'características');
  } else {
    console.log('Error al recargar datos, manteniendo datos actuales');
  }
}

// Hacer accesibles las funciones globalmente
window.resetWeights = resetWeights;
window.updateWeight = updateWeight;
window.reloadDataFromCSV = reloadDataFromCSV;