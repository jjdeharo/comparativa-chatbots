# Comparativa de Chatbots Gratuitos

Una aplicación web interactiva para comparar y evaluar chatbots gratuitos según las necesidades específicas del usuario.

## 🚀 Características

- **Carga dinámica de datos** desde Google Sheets
- **Evaluación personalizada** con pesos ajustables por característica
- **Actualización automática** cuando se modifica la hoja de cálculo
- **Sistema de puntuación inteligente** con bonificaciones por edad
- **Interfaz responsive** que se adapta a dispositivos móviles
- **Fallback automático** a datos por defecto si no hay conectividad

## 📊 Cómo funciona

La aplicación permite asignar importancia (de "Sin importancia" a "Obligatorio") a diferentes características de los chatbots:

- **Generación de contenido**: Imágenes, video, texto
- **Funcionalidades técnicas**: Intérprete de código, cálculos matemáticos
- **Características sociales**: Compartir conversaciones, chat privado
- **Integraciones**: Documentos, servicios externos, CLI
- **Restricciones de edad**: Filtro para menores de edad

Cada chatbot recibe una puntuación basada en:
1. **Puntuación base**: Suma de características × peso asignado
2. **Bonus por edad**: +1 si es apto para menores de 18 años
3. **Requisitos obligatorios**: Puntuación 0 si falta alguna característica marcada como obligatoria

## 🔧 Configuración de datos

### Estructura del CSV (Google Sheets)

La aplicación lee datos desde una hoja de cálculo con la siguiente estructura:

```
Fila 1: [Vacía - estética]
Fila 2: [Título/logos - no se usa]
Fila 3: [Nombres de chatbots desde columna C]
Fila 4+: [Características desde columna B, datos desde columna C]
```

**Ejemplo:**
```
|   | A | B                           | C      | D    | E       | ...
|---|---|------------------------------|--------|------|---------|----
| 1 |   |                             |        |      |         |
| 2 |   | Características             |        |      |         |
| 3 |   | 22/08/2025                  | Gemini | Grok | ChatGPT | ...
| 4 | 1 | Generación de imágenes      | Sí     | Sí   | Sí      | ...
| 5 | 2 | Intérprete de código        | Sí     | Sí   | Sí      | ...
| 6 | 3 | Edad mínima de uso          | 14     | 13   | 14      | ...
```

### Formatos de datos

- **Características booleanas**: `"Sí"` = 1 punto, `"No"` = 0 puntos
- **Edad**: Números (14, 13, 18, etc.) → Convertido automáticamente a 1 si <18, 0 si ≥18
- **⚠️ IMPORTANTE**: La edad **debe ser siempre la última característica** en el CSV

### URL del CSV

Actualiza la constante `CSV_URL` en `script.js` con tu URL de Google Sheets:

```javascript
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/TU_ID_AQUI/pub?output=csv";
```

## 🛠️ Instalación y uso

### Opción 1: Servidor local
```bash
# Clonar el repositorio
git clone https://github.com/jjdeharo/comparativa-chatbots.git
cd comparativa-chatbots

# Servir con Python
python3 -m http.server 8000

# Abrir en navegador
open http://localhost:8000
```

### Opción 2: GitHub Pages
La aplicación está disponible en: [https://jjdeharo.github.io/comparativa-chatbots/](https://jjdeharo.github.io/comparativa-chatbots/)

### Opción 3: Cualquier servidor web
Sube los archivos a cualquier servidor web que soporte archivos estáticos.

## 📱 Uso de la aplicación

1. **Ajustar importancia**: Usa los deslizadores para asignar peso a cada característica
2. **Ver resultados**: Los chatbots se ordenan automáticamente por puntuación
3. **Filtrar por edad**: Activa "Solo menores" para ver únicamente chatbots aptos para menores
4. **Restaurar**: Usa el botón "↺ Restaurar" para volver a la configuración por defecto

## 🔄 Actualización de datos

La aplicación se actualiza automáticamente cuando modificas la hoja de cálculo de Google Sheets:

- **Añadir/quitar chatbots**: Agrega columnas desde la columna C
- **Añadir/quitar características**: Agrega filas desde la fila 4
- **Modificar valores**: Cambia "Sí"/"No" o valores de edad
- **Recarga manual**: Ejecuta `reloadDataFromCSV()` en la consola del navegador

## ⚙️ Estructura del proyecto

```
comparativa-chatbots/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño responsive
├── script.js           # Lógica de la aplicación
├── data.csv            # [No usado] Archivo de respaldo
└── README.md           # Este archivo
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) - consulta el archivo LICENSE para más detalles.

## 📧 Contacto

**Juan José de Haro** - [https://ja.cat/chatbots](https://ja.cat/chatbots)

---

⚠️ **Nota importante**: La característica "Edad mínima de uso" debe ser siempre la última fila en tu hoja de cálculo para que el sistema funcione correctamente.