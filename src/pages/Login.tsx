import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [difficulty, setDifficulty] = useState("easy")

  const handleStart = () => {
    navigate('/quiz', { state: { name, difficulty } })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-6">
        <Header />
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Test Your Logic Skills</h1>
          <p className="text-muted-foreground">Challenge yourself with logic statements and quantifiers. Enter your name to begin.</p>
        </div>
        
        <div className="space-y-4">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Select
            value={difficulty}
            onValueChange={setDifficulty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            className="w-full" 
            onClick={handleStart}
            disabled={!name.trim()}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
} 