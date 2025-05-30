import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/Home";
import PortfolioPage from "../pages/Portfolio";
import FaqPage from "../pages/Faq";
import ContatoPage from "../pages/Contato";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "contato", element: <ContatoPage /> },
    ],
  },
]);

export default router;