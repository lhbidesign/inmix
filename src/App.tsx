import { Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Auth from '@/pages/Auth'
import ProjectDetail from '@/pages/ProjectDetail'
import Settings from '@/pages/Settings'
import Presets from '@/pages/Presets'
import Projects from '@/pages/Projects'
import Landing from '@/pages/Landing'
import About from '@/pages/About'
import Pricing from '@/pages/Pricing'
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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
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
          <Route path="/index" element={<Index />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
