import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { getQuestions } from '@/utils/questionUtils'
import { Footer } from '@/components/footer'

type Question = {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

const TIMER_DURATION = {
  easy: 30,    // 30 seconds per question for easy
  medium: 45,  // 45 seconds per question for medium
  hard: 60     // 60 seconds per question for hard
}

export function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  
  const difficulty = location.state?.difficulty || 'easy'
  const userName = location.state?.name || 'Player'

  // Initialize timer for each question
  useEffect(() => {
    setTimeLeft(TIMER_DURATION[difficulty as keyof typeof TIMER_DURATION])
  }, [currentQuestionIndex, difficulty])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - move to next question
          handleNext()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    const loadedQuestions = getQuestions(difficulty)
    setQuestions(loadedQuestions)
  }, [difficulty])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer === null && timeLeft > 0) {
      setSelectedAnswer(answer)
      if (answer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz finished
      navigate('/results', { 
        state: { 
          score, 
          total: questions.length,
          difficulty,
          name: userName
        } 
      })
    }
  }

  if (!currentQuestion) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
            </div>
            <div className="text-xl font-mono">
              Time: {formatTime(timeLeft)}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-secondary rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          {/* Timer bar */}
          <div className="h-1 bg-secondary rounded-full mt-2">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ 
                width: `${(timeLeft / TIMER_DURATION[difficulty as keyof typeof TIMER_DURATION]) * 100}%`,
                backgroundColor: timeLeft < 10 ? 'rgb(239 68 68)' : undefined // Red when time is low
              }}
            />
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg animate-in fade-in duration-300">
          <h3 className="text-2xl font-bold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              className={`
                w-full 
                text-wrap 
                min-h-[50px] 
                h-auto 
                py-2 
                px-4 
                justify-start 
                text-left 
                break-words 
                whitespace-normal 
                ${selectedAnswer && option === currentQuestion.correctAnswer
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : selectedAnswer === option
                  ? "bg-red-500 hover:bg-red-500 text-white"
                  : ""
                }
              `}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null || timeLeft === 0}
            >
              {option}
            </Button>
            ))}
          </div>

          {(selectedAnswer || timeLeft === 0) && (
            <Button
              className="w-full mt-6 animate-in fade-in slide-in-from-bottom-4"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
        <div className="mt-4 text-muted-foreground text-center">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium animate-in fade-in">
            Score: {score}/{questions.length}
          </span>
        </div>
      </div>
      <Footer />
    </div>
  )
}