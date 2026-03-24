import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { CalculatorPage } from "../pages/CalculatorPage";
import { FaqPage } from "../pages/FaqPage";
import { LandingPage } from "../pages/LandingPage";
import { ResultPage } from "../pages/ResultPage";
import { SeoScenarioPage } from "../pages/SeoScenarioPage";

const localizedChildren = (language: "ru" | "tr" | "en") => {
  const paths = {
    ru: {
      calculator: "kalkulyator",
      result: "rezultat",
      faq: "faq",
      guides: "gidy/:slug",
    },
    tr: {
      calculator: "hesaplayici",
      result: "sonuc",
      faq: "sss",
      guides: "rehberler/:slug",
    },
    en: {
      calculator: "calculator",
      result: "result",
      faq: "faq",
      guides: "guides/:slug",
    },
  }[language];

  return [
    { index: true, element: <LandingPage /> },
    { path: paths.calculator, element: <CalculatorPage /> },
    { path: paths.result, element: <ResultPage /> },
    { path: paths.faq, element: <FaqPage /> },
    { path: paths.guides, element: <SeoScenarioPage /> },
  ];
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: localizedChildren("ru"),
  },
  {
    path: "/tr",
    element: <RootLayout />,
    children: localizedChildren("tr"),
  },
  {
    path: "/en",
    element: <RootLayout />,
    children: localizedChildren("en"),
  },
]);
