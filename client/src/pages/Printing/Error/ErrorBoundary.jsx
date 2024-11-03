import React from "react";

function ErrorBoundary() {
  return (
    <>
      <div>ErrorBoundary</div>
      <div className="p-4">
        <h1>Error</h1>
        <p>an error occured please try again later!</p>
      </div>
    </>
  );
}

export default ErrorBoundary;
