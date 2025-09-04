import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RotasApp } from "./Hooks/RotasApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AppErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Erro capturado no App:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Ocorreu um erro: {this.state.error?.message || JSON.stringify(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}

// No App.jsx
function App() {
  return (
    <AppErrorBoundary>
      <Router>
        <RotasApp />
        <ToastContainer 
          position="top-right" 
          autoClose={2000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="colored"
        />
      </Router>
    </AppErrorBoundary>
  );
}

export default App;
