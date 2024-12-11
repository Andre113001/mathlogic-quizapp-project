import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Quiz } from './pages/Quiz'
import { Results } from './pages/Results'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
