import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 text-dark-purple">404</h1>
      <h2 className="mb-4">Página Não Encontrada</h2>
      <p className="lead mb-4">
        A página que você está procurando pode ter sido removida ou não está disponível no momento.
      </p>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn btn-purple btn-lg">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;