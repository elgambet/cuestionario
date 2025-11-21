export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Ranking {
  title: string;
  subtitle: string;
  minScore: number;
  maxScore: number;
}

export const QUESTIONS: Question[] = [
  {
    question: "¿En qué año llegó el hombre a la Luna?",
    answers: [
      { text: "1965", isCorrect: false },
      { text: "1969", isCorrect: true },
      { text: "1972", isCorrect: false },
    ],
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answers: [
      { text: "Saturno", isCorrect: false },
      { text: "Neptuno", isCorrect: false },
      { text: "Júpiter", isCorrect: true },
    ],
  },
  {
    question: "¿Qué empresa fue la primera en lograr un cohete reutilizable?",
    answers: [
      { text: "Blue Origin", isCorrect: false },
      { text: "SpaceX", isCorrect: true },
      { text: "NASA", isCorrect: false },
    ],
  },
  {
    question: "¿Cómo se llama el rover más reciente de la NASA en Marte?",
    answers: [
      { text: "Curiosity", isCorrect: false },
      { text: "Perseverance", isCorrect: true },
      { text: "Opportunity", isCorrect: false },
    ],
  },
  {
    question: "¿Cuál es la velocidad necesaria para escapar de la gravedad terrestre?",
    answers: [
      { text: "11.2 km/s", isCorrect: true },
      { text: "7.9 km/s", isCorrect: false },
      { text: "15.5 km/s", isCorrect: false },
    ],
  },
  {
    question: "¿Qué astronauta fue el primero en caminar en el espacio?",
    answers: [
      { text: "Yuri Gagarin", isCorrect: false },
      { text: "Alexei Leonov", isCorrect: true },
      { text: "Neil Armstrong", isCorrect: false },
    ],
  },
  {
    question: "¿Qué combustible utiliza el cohete Falcon 9 de SpaceX?",
    answers: [
      { text: "Hidrógeno líquido", isCorrect: false },
      { text: "Queroseno (RP-1) y oxígeno líquido", isCorrect: true },
      { text: "Metano líquido", isCorrect: false },
    ],
  },
  {
    question: "¿Cuántos motores Raptor tiene el cohete Starship de SpaceX?",
    answers: [
      { text: "33", isCorrect: false },
      { text: "9", isCorrect: false },
      { text: "6", isCorrect: true },
    ],
  },
  {
    question: "¿Cuál es el nombre de la estación espacial internacional?",
    answers: [
      { text: "ISS (International Space Station)", isCorrect: true },
      { text: "Mir", isCorrect: false },
      { text: "Tiangong", isCorrect: false },
    ],
  },
  {
    question: "¿Qué planeta es conocido como el planeta rojo?",
    answers: [
      { text: "Venus", isCorrect: false },
      { text: "Marte", isCorrect: true },
      { text: "Mercurio", isCorrect: false },
    ],
  },
];

export const RANKINGS: Ranking[] = [
  {
    title: "Cadete Espacial",
    subtitle: "Necesitas más entrenamiento",
    minScore: 0,
    maxScore: 3,
  },
  {
    title: "Piloto",
    subtitle: "Vas por buen camino",
    minScore: 4,
    maxScore: 5,
  },
  {
    title: "Capitán",
    subtitle: "Conocimiento sólido",
    minScore: 6,
    maxScore: 7,
  },
  {
    title: "Comandante",
    subtitle: "Excelente desempeño",
    minScore: 8,
    maxScore: 9,
  },
  {
    title: "Almirante de Flota",
    subtitle: "Misión perfecta",
    minScore: 10,
    maxScore: 10,
  },
];
