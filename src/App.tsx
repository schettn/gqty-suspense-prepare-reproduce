import { Suspense, useState, useTransition } from "react";

import React from "react";
import { useQuery } from "./gqty";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid red",
            margin: "10px",
            backgroundColor: "#fff5f5",
          }}
        >
          <h2 style={{ color: "#c53030" }}>Error Caught by Boundary</h2>
          <p>
            <strong>Message:</strong>{" "}
            {this.state.error?.message || "Unknown error"}
          </p>
          <pre
            style={{ fontSize: "12px", background: "#eee", padding: "10px" }}
          >
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Reset Error Boundary
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Page: React.FC = () => {
  const [someCounter, setSomeCounter] = useState(0);
  console.log("%c Rendering Page, counter:", "color: blue; font-weight: bold", someCounter);

  const data = useQuery({
    suspense: true,
    prepare(helpers) {
      console.log("%c [prepare] calling mirror with input:", "color: green", someCounter);
      helpers.query.mirror({ input: someCounter.toString() });
    },
  });

  const handleIncrease = () => {
    console.log("Increasing counter...");
    setSomeCounter((prev) => prev + 1);
  };

  const handleRefresh = () => {
    console.log("Refreshing...");
    // Just trigger a re-render
    setSomeCounter(c => c);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GQty Suspense Prepare Reproduction</h1>
      <p>Current Counter: <strong>{someCounter}</strong> (Error expected at 3)</p>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleIncrease}>
          Increase Counter
        </button>
        <button onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      <div style={{ border: "1px solid #e2e8f0", padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
        <h3>Data Result:</h3>
        <p style={{ fontSize: "18px" }}>
          {data.mirror({ input: someCounter.toString() })}
        </p>
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#4a5568" }}>
        <p>Instructions:</p>
        <ol>
          <li>Open Browser Console.</li>
          <li>Click "Increase Counter" until it reaches 3.</li>
          <li>
            Observe if the Error Boundary catches the GraphQL error (thrown by the server for input "3").
            Currently, it <strong>loops infinitely</strong> in the background (check the console) instead of showing the Error Boundary.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default () => {
  return (
    <ErrorBoundary fallback={<div>Top Level Error</div>}>
      <Suspense
        fallback={
          <div style={{ padding: "20px" }}>Loading (Suspense Fallback)...</div>
        }
      >
        <ErrorBoundary>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  );
};
