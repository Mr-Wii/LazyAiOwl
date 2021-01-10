import React from "react";
import ReactDOM from "react-dom";
import ContextAiOwl from './ContextAiOwl'
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <ContextAiOwl>
        <App />
    </ContextAiOwl>
,
  rootElement
);