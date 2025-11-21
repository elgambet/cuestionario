# Cuestionario Interactivo con Video

Una aplicación web interactiva que combina un cuestionario con reproducción de video sincronizada. Cada respuesta correcta avanza el video en tiempo real, creando una experiencia única de aprendizaje.

## Características

- 🎥 **Video sincronizado**: El video se reproduce en segmentos basados en las respuestas
- 💻 **Interfaz tipo terminal**: Diseño inspirado en terminales Linux
- 📱 **Optimizado para móviles**: Diseñado específicamente para dispositivos móviles
- ⌨️ **Animación de escritura**: Las preguntas se escriben letra por letra
- 🏆 **Sistema de rankings**: 5 niveles de clasificación basados en el puntaje
- 📊 **Pantalla de resultados**: Muestra tu puntaje y ranking al finalizar

## Configuración

### Preguntas y Respuestas

Edita el archivo [constants/questionnaire.ts](constants/questionnaire.ts) para personalizar las preguntas:

```typescript
export const QUESTIONS: Question[] = [
  {
    question: "¿Cuál es la capital de España?",
    answers: [
      { text: "Barcelona", isCorrect: false },
      { text: "Madrid", isCorrect: true },
      { text: "Valencia", isCorrect: false },
    ],
  },
  // Añade más preguntas aquí
];
```

### Rankings

Los rankings también se configuran en [constants/questionnaire.ts](constants/questionnaire.ts):

```typescript
export const RANKINGS: Ranking[] = [
  {
    title: "Principiante",
    subtitle: "Necesitas estudiar más",
    minScore: 0,
    maxScore: 1,
  },
  // Configura los 5 rankings
];
```

### Video

Coloca tu video en [public/video.mp4](public/video.mp4). El video se dividirá automáticamente según el número de preguntas.

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

## Compilación para Producción

```bash
# Generar build estático
npm run build

# Los archivos se generarán en la carpeta ./out
```

## Despliegue en GitHub Pages

### Configuración Manual

1. **Habilitar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: GitHub Actions

2. **Ajustar basePath**:
   - Edita `next.config.ts`
   - Cambia `"/cuestionario"` por el nombre de tu repositorio

3. **Push al repositorio**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. El workflow de GitHub Actions se ejecutará automáticamente

### Acceder a la aplicación

Una vez desplegada, tu aplicación estará disponible en:
```
https://[tu-usuario].github.io/[nombre-repositorio]/
```

## Estructura del Proyecto

```
questionnaire-app/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal con lógica
│   └── globals.css         # Estilos globales
├── components/
│   ├── VideoPlayer.tsx     # Componente de video
│   ├── TerminalOverlay.tsx # Overlay con preguntas
│   └── EndScreen.tsx       # Pantalla final
├── constants/
│   └── questionnaire.ts    # Configuración de preguntas y rankings
├── public/
│   ├── video.mp4          # Tu video
│   └── .nojekyll          # Para GitHub Pages
└── next.config.ts         # Configuración de Next.js
```

## Tecnologías

- **Next.js 16** - Framework React con exportación estática
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **React 19** - Biblioteca UI

## Personalización

### Colores del Terminal

Edita los colores en [components/TerminalOverlay.tsx](components/TerminalOverlay.tsx) y [components/EndScreen.tsx](components/EndScreen.tsx):

```css
border-green-500  /* Color del borde */
text-green-400    /* Color del texto */
bg-black/80       /* Fondo semi-transparente */
```

### Velocidad de Escritura

Cambia la velocidad en [components/TerminalOverlay.tsx](components/TerminalOverlay.tsx):

```typescript
const typingSpeed = 50; // milisegundos por carácter
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Si encuentras algún problema o tienes sugerencias, abre un issue en el repositorio de GitHub.
