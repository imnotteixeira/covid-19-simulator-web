/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import AppTheme from "./AppTheme.js";
import "./index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={AppTheme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>, document.getElementById("root"));
