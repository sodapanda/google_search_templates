import ReactDOM from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout'
import Home from './pages/home'

import './index.css'
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
