import { Component } from "react";

// Fallback UI Component
const FallbackUI = ({ error, resetErrorBoundary }) => (
  <div className="error-boundary">
    <h2>Oops! Something went wrong...</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  // This is where the error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Set error state
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, info);
    this.setState({ info });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <FallbackUI
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children; // Render children if no error
  }

  // Optional: Reset the error state and try again
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null, info: null });
  };
}

export default ErrorBoundary;
