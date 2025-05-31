import { createHashRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/Home";
import PortfolioPage from "../pages/Portfolio";
import FaqPage from "../pages/Faq";
import ContatoPage from "../pages/Contato";
import NotFoundPage from "../pages/NotFoundPage";

const repoName = '/studiobrisa-react-estatico'; // Nome do seu repositório

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "*", element: <NotFoundPage /> } // Rota para 404
    ],
  },
], {
  basename: repoName // Adicione o basename aqui
});

export default router;