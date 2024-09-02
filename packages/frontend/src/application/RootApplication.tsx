import ReactDOM from "react-dom/client";
import { StrictMode, Suspense } from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "styles/theme";
import { AuthProvider } from "local-service/auth/AuthProvider";
import { ApolloRootApplication } from "./ApolloRootApplication";
import { Router } from "./Router";
import "styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloRootApplication>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </ApolloRootApplication>
    </AuthProvider>
  </StrictMode>,
);
