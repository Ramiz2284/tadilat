import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { LandingPage } from "../pages/LandingPage";
import { CalculatorPage } from "../pages/CalculatorPage";
import { ResultPage } from "../pages/ResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "calculator", element: <CalculatorPage /> },
      { path: "result", element: <ResultPage /> },
    ],
  },
]);
