"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-dashed border-primary/30 rounded-2xl">
          <p className="text-muted-foreground mb-2">3D visualization is currently unavailable.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
