import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/Home";
import PortfolioPage from "../pages/Portfolio";
import FaqPage from "../pages/Faq";
import ContatoPage from "../pages/Contato";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import CadastroPage from "../pages/CadastroPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import FavoritosPage from "../pages/FavoritosPage";
import AdminPage from "../pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cadastrar", element: <CadastroPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
      { path: "favoritos", element: <FavoritosPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  }
], {
  basename: import.meta.env.BASE_URL  
});

export default router;