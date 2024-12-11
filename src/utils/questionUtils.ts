import questions from '../data/questions.json'

type Difficulty = 'easy' | 'medium' | 'hard'
type Question = {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

const QUESTIONS_PER_DIFFICULTY = {
  easy: 10,
  medium: 15,
  hard: 20,
}

export function getQuestions(difficulty: Difficulty): Question[] {
  // Get all questions for the selected difficulty
  const allQuestions = questions[difficulty]
  
  // Shuffle the questions array
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5)
  
  // Take only the required number of questions
  const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_PER_DIFFICULTY[difficulty])
  
  // Shuffle options for each question
  return selectedQuestions.map(question => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5)
  }))
} 