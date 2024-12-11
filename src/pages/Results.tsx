import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"

type ResultsState = {
  score: number
  total: number
  difficulty: string
  name: string
}

export function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const { score, total, difficulty, name } = location.state as ResultsState

  // Calculate percentage
  const percentage = Math.round((score / total) * 100)

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding!"
    if (percentage >= 70) return "Great job!"
    if (percentage >= 50) return "Good effort!"
    return "Keep practicing!"
  }

  // Redirect to login if accessed directly without results
  useEffect(() => {
    if (!location.state) {
      navigate('/login')
    }
  }, [location.state, navigate])

  const handleReturnToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-card p-8 rounded-lg shadow-lg text-center space-y-6">
          <h1 className="text-4xl font-bold animate-in zoom-in-50 duration-300">
            Quiz Complete!
          </h1>
          
          <div className="space-y-2 animation-delay-200">
            <p className="text-xl font-medium">
              Well done, {name}!
            </p>
            <p className="text-muted-foreground">
              Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
          </div>

          <div className="space-y-2 py-6 animation-delay-500">
            <div className="text-6xl font-bold text-primary">
              {percentage}%
            </div>
            <p className="text-2xl font-semibold">
              {getPerformanceMessage()}
            </p>
            <p className="text-muted-foreground">
              You scored {score} out of {total} questions
            </p>
          </div>

          {/* Score breakdown visualization */}
          <div className="w-full bg-secondary rounded-full h-4 animation-delay-700">
            <div
              className="bg-primary h-full rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <Button 
            className="w-full mt-8 animation-delay-700"
            onClick={handleReturnToLogin}
          >
            Try Another Quiz
          </Button>
        </div>
      </div>
    </div>
  )
} 