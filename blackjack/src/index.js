import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a33ad307dd2ec116c129aa75635b099d@o4508363333959680.ingest.de.sentry.io/4509174051110993"
});
Sentry.captureException(new Error("Test manuel Sentry"));

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Une erreur est survenue</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();