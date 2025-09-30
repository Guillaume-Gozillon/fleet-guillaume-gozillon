import { Component, type ReactNode } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { err?: string }
> {
  state = { err: undefined as string | undefined }
  static getDerivedStateFromError(e: unknown) {
    return { err: String(e) }
  }
  render() {
    return this.state.err ? (
      <div style={{ padding: 20, color: '#b00020' }}>
        Runtime error: {this.state.err}
      </div>
    ) : (
      this.props.children
    )
  }
}
