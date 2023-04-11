import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { MangaContextProvider } from "./Context/MangaContext";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { ChapterContextProvider } from "./Context/ChapterContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <MangaContextProvider>
          <ThemeContextProvider>
            <ChapterContextProvider>
              <App />
            </ChapterContextProvider>
          </ThemeContextProvider>
        </MangaContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
