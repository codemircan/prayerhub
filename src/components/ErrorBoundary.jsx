import React from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">We encountered an unexpected error.</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
