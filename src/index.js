import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // Import styles

//rendering data to root element in document
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
