import { Component, useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Auth from '@/pages/Auth'
import ProjectDetail from '@/pages/ProjectDetail'
import Settings from '@/pages/Settings'
import Presets from '@/pages/Presets'
import Projects from '@/pages/Projects'
import Landing from '@/pages/Landing'
import About from '@/pages/About'
import Pricing from '@/pages/Pricing'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import Index from '@/pages/Index'
import DesignSystem from '@/pages/DesignSystem'
import PasswordGate from '@/components/PasswordGate'
import './index.css'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null }
  static getDerivedStateFromError(e: Error) { return { error: e.message } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: 'red', padding: 40, fontFamily: 'monospace' }}>
          <strong>Error:</strong> {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PasswordGate><Landing /></PasswordGate>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<PasswordGate><Auth /></PasswordGate>} />
          <Route path="/register" element={<PasswordGate><Auth /></PasswordGate>} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/presets" element={<Presets />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<PasswordGate><About /></PasswordGate>} />
          <Route path="/pricing" element={<PasswordGate><Pricing /></PasswordGate>} />
          <Route path="/privacy" element={<PasswordGate><Privacy /></PasswordGate>} />
          <Route path="/terms" element={<PasswordGate><Terms /></PasswordGate>} />
          <Route path="/index" element={<Index />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
