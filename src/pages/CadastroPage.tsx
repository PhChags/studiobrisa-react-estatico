import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { usuarioCadastroSchema, type UsuarioCadastroFormData } from '../schemas/UsuarioSchema';
import useCadastrarUsuario from '../hooks/useCadastrarUsuario';
import FormFeedback from '../components/FormFeedback';
import Loader from '../components/Loader';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const CadastroPage: React.FC = () => {
    document.title = "Cadastro | Studio Brisa";
    const navigate = useNavigate();
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        watch
    } = useForm<UsuarioCadastroFormData>({
        resolver: zodResolver(usuarioCadastroSchema),
        mode: 'onChange'
    });
    
    // Observa os campos para feedback visual
    const emailValor = watch('conta');
    const senhaValor = watch('senha');
    const confirmacaoValor = watch('confirmacaoSenha');
    
    const cadastroMutation = useCadastrarUsuario();
    
    const onSubmit = async (data: UsuarioCadastroFormData) => {
        try {
            await cadastroMutation.mutateAsync(data);
            setMensagemSucesso("Cadastro realizado com sucesso! Você será redirecionado para login.");
            
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            
        } catch (error) {
            console.error("Erro no cadastro:", error);
        }
    };

    // Funções para alternar visibilidade da senha
    const toggleSenhaVisibilidade = () => setSenhaVisivel(!senhaVisivel);
    const toggleConfirmacaoVisibilidade = () => setConfirmacaoVisivel(!confirmacaoVisivel);
    
    // Verifica o estado de validação para cada campo
    const emailValido = !errors.conta && emailValor && emailValor.length > 0;
    const senhaValida = !errors.senha && senhaValor && senhaValor.length >= 6;
    const confirmacaoValida = !errors.confirmacaoSenha && 
                             confirmacaoValor && 
                             confirmacaoValor === senhaValor;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-purple text-white text-center py-3">
                            <h2 className="mb-0">Criar Nova Conta</h2>
                        </div>
                        
                        <div className="card-body p-4">
                            {mensagemSucesso ? (
                                <div className="alert alert-success">
                                    {mensagemSucesso}
                                    <div className="mt-2">
                                        <Loader size="sm" />
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Campo Email */}
                                    <div className="mb-3">
                                        <label htmlFor="conta" className="form-label fw-bold">
                                            Email
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                id="conta"
                                                className={`form-control ${errors.conta ? 'is-invalid' : ''} ${emailValido ? 'is-valid' : ''}`}
                                                {...register('conta')}
                                                placeholder="seu.email@exemplo.com"
                                            />
                                            {emailValido && (
                                                <span className="input-group-text bg-success text-white">
                                                    <FaCheckCircle />
                                                </span>
                                            )}
                                            {errors.conta && (
                                                <span className="input-group-text bg-danger text-white">
                                                    <FaExclamationCircle />
                                                </span>
                                            )}
                                        </div>
                                        <FormFeedback error={errors.conta} />
                                    </div>
                                    
                                    {/* Campo Senha */}
                                    <div className="mb-3">
                                        <label htmlFor="senha" className="form-label fw-bold">
                                            Senha
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={senhaVisivel ? "text" : "password"}
                                                id="senha"
                                                className={`form-control ${errors.senha ? 'is-invalid' : ''} ${senhaValida ? 'is-valid' : ''}`}
                                                {...register('senha')}
                                                placeholder="Mínimo 6 caracteres"
                                            />
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary d-flex align-items-center"
                                                onClick={toggleSenhaVisibilidade}
                                                aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                                            >
                                                {senhaVisivel ? <EyeSlash /> : <Eye />}
                                            </button>
                                        </div>
                                        <FormFeedback error={errors.senha} />
                                        <div className="form-text">
                                            A senha deve ter pelo menos 6 caracteres
                                        </div>
                                    </div>
                                    
                                    {/* Campo Confirmação de Senha */}
                                    <div className="mb-4">
                                        <label htmlFor="confirmacaoSenha" className="form-label fw-bold">
                                            Confirmar Senha
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={confirmacaoVisivel ? "text" : "password"}
                                                id="confirmacaoSenha"
                                                className={`form-control ${errors.confirmacaoSenha ? 'is-invalid' : ''} ${confirmacaoValida ? 'is-valid' : ''}`}
                                                {...register('confirmacaoSenha')}
                                                placeholder="Repita a senha"
                                            />
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary d-flex align-items-center"
                                                onClick={toggleConfirmacaoVisibilidade}
                                                aria-label={confirmacaoVisivel ? "Ocultar senha" : "Mostrar senha"}
                                            >
                                                {confirmacaoVisivel ? <EyeSlash /> : <Eye />}
                                            </button>
                                        </div>
                                        <FormFeedback error={errors.confirmacaoSenha} />
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        className="btn btn-purple w-100 py-2 fw-bold"
                                        disabled={cadastroMutation.isPending || !isValid}
                                    >
                                        {cadastroMutation.isPending ? (
                                            <Loader size="sm" text="Cadastrando..." />
                                        ) : (
                                            "Criar Conta"
                                        )}
                                    </button>
                                    
                                    {cadastroMutation.isError && (
                                        <div className="alert alert-danger mt-3">
                                            {cadastroMutation.error.message}
                                        </div>
                                    )}
                                </form>
                            )}
                            
                            <div className="mt-4 text-center">
                                <p className="mb-0">
                                    Já tem uma conta? 
                                    <Link to="/login" className="text-purple fw-bold ms-1">
                                        Faça login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <p className="text-muted small">
                            Ao se cadastrar, você concorda com nossos Termos de Serviço e Política de Privacidade
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroPage;