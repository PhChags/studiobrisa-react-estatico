import React, { useState } from 'react';
import { type UsuarioCadastroDTO } from '../interfaces/Usuario';
import useCadastrarUsuario from '../hooks/useCadastrarUsuario';

const CadastroForm: React.FC = () => {
    const [dto, setDto] = useState<UsuarioCadastroDTO>({ 
        conta: '', 
        senha: '', 
        confirmacaoSenha: '' 
    });
    const [erros, setErros] = useState<Record<string, string>>({});
    const cadastroMutation = useCadastrarUsuario();
    
    const validarForm = (): boolean => {
        const novosErros: Record<string, string> = {};
        
        if (!dto.conta.includes('@')) {
            novosErros.conta = 'Email inválido';
        }
        
        if (dto.senha.length < 6) {
            novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
        }
        
        if (dto.senha !== dto.confirmacaoSenha) {
            novosErros.confirmacaoSenha = 'As senhas não coincidem';
        }
        
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validarForm()) {
            cadastroMutation.mutate(dto);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
                <label htmlFor="conta" className="form-label">Email</label>
                <input
                    type="email"
                    className={`form-control ${erros.conta ? 'is-invalid' : ''}`}
                    id="conta"
                    value={dto.conta}
                    onChange={(e) => setDto({ ...dto, conta: e.target.value })}
                    required
                />
                {erros.conta && <div className="invalid-feedback">{erros.conta}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                    type="password"
                    className={`form-control ${erros.senha ? 'is-invalid' : ''}`}
                    id="senha"
                    value={dto.senha}
                    onChange={(e) => setDto({ ...dto, senha: e.target.value })}
                    required
                />
                {erros.senha && <div className="invalid-feedback">{erros.senha}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="confirmacaoSenha" className="form-label">Confirme a Senha</label>
                <input
                    type="password"
                    className={`form-control ${erros.confirmacaoSenha ? 'is-invalid' : ''}`}
                    id="confirmacaoSenha"
                    value={dto.confirmacaoSenha}
                    onChange={(e) => setDto({ ...dto, confirmacaoSenha: e.target.value })}
                    required
                />
                {erros.confirmacaoSenha && <div className="invalid-feedback">{erros.confirmacaoSenha}</div>}
            </div>
            
            <button 
                type="submit" 
                className="btn btn-purple w-100"
                disabled={cadastroMutation.isPending}
            >
                {cadastroMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            
            {cadastroMutation.isSuccess && (
                <div className="alert alert-success mt-3">
                    Cadastro realizado com sucesso! Agora você pode fazer login.
                </div>
            )}
            
            {cadastroMutation.isError && (
                <div className="alert alert-danger mt-3">
                    {cadastroMutation.error.message.includes('já está em uso') 
                        ? 'Este email já está cadastrado' 
                        : 'Erro ao cadastrar. Tente novamente mais tarde.'}
                </div>
            )}
        </form>
    );
};

export default CadastroForm;