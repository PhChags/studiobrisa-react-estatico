import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEfetuarLogin from '../hooks/useEfetuarLogin';
import type Usuario from '../interfaces/Usuario';
import useUsuarioStore from '../stores/UsuarioStore';
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const LoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>({ conta: '', senha: '' });
  const [errors, setErrors] = useState({ conta: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const loginMutation = useEfetuarLogin();
  const setUsuarioStore = useUsuarioStore(state => state.setUsuario);
  const navigate = useNavigate();
  
  // Validação em tempo real
  const validateField = (name: keyof typeof errors, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'conta':
        if (!value) {
          newErrors.conta = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.conta = 'Email inválido';
        } else {
          newErrors.conta = '';
        }
        break;
        
      case 'senha':
        if (!value) {
          newErrors.senha = 'Senha é obrigatória';
        } else if (value.length < 6) {
          newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        } else {
          newErrors.senha = '';
        }
        break;
    }
    
    setErrors(newErrors);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
    setSubmitError('');
    
    // Validação em tempo real após alteração
    if (errors[name as keyof typeof errors]) {
      validateField(name as keyof typeof errors, value);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof errors, value);
  };
  
  const validateForm = () => {
    const newErrors = { conta: '', senha: '' };
    let isValid = true;
    
    if (!usuario.conta) {
      newErrors.conta = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(usuario.conta)) {
      newErrors.conta = 'Email inválido';
      isValid = false;
    }
    
    if (!usuario.senha) {
      newErrors.senha = 'Senha é obrigatória';
      isValid = false;
    } else if (usuario.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    loginMutation.mutate(usuario, {
      onSuccess: (data) => {
        if (data.token && data.id) {
          setUsuarioStore(data.id);
          navigate('/');
        }
      },
      onError: (error) => {
        // Tratamento aprimorado de erros
        if (error.message.includes('Failed to fetch')) {
          setSubmitError('Não foi possível conectar ao servidor');
        } else if (error.message.includes('Unexpected token')) {
          setSubmitError('Credenciais inválidas');
        } else {
          setSubmitError(error.message || 'Credenciais inválidas');
        }
        
        // Destacar campos com erro
        setErrors({
          conta: ' ',
          senha: ' '
        });
      }
    });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="conta" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.conta || submitError ? 'is-invalid' : ''}`}
          id="conta"
          name="conta"
          value={usuario.conta}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.conta && <div className="invalid-feedback d-block">{errors.conta}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.senha || submitError ? 'is-invalid' : ''}`}
            id="senha"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
        </div>
        {errors.senha && <div className="invalid-feedback d-block">{errors.senha}</div>}
      </div>
      
      <div className="mb-3 text-end">
        <Link to="/recuperar-senha" className="text-purple text-small">
          Esqueceu sua senha?
        </Link>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-purple w-100"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
      </button>
      
      {submitError && (
        <div className="alert alert-danger mt-3">
          {submitError}
        </div>
      )}
    </form>
  );
};

export default LoginForm;