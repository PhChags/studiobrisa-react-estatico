import React from 'react';
import LoginForm from '../components/LoginForm';
import { NavLink } from 'react-router-dom';

const LoginPage: React.FC = () => {
    document.title = "Login | Studio Brisa";
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-header bg-purple text-white">
                            <h3 className="text-center mb-0">Login</h3>
                        </div>
                        <div className="card-body p-4">
                            <LoginForm />
                            
                            <div className="mt-4 text-center">
                                <p className="mb-0">
                                    Não tem uma conta? 
                                    <NavLink to="/cadastrar" className="text-purple fw-bold ms-1">
                                        Cadastre-se
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;