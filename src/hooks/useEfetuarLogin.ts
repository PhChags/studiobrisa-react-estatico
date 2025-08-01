import { useMutation } from "@tanstack/react-query";
import type Usuario from "../interfaces/Usuario";
import useUsuarioStore from "../stores/UsuarioStore";
import type TokenResponse from "../interfaces/TokenResponse";

const efetuarLogin = async (usuario: Usuario): Promise<TokenResponse> => {
    const response = await fetch("http://localhost:8080/api/autenticacao/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });
    
    if (!response.ok) {
        let errorMessage = 'email ou senha incorretos';
        
        try {
            // Tenta extrair mensagem de erro do JSON
            const errorData = await response.json();
            if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
                errorMessage = errorData.message;
            } else if (typeof errorData === 'string') {
                errorMessage = errorData;
            }
        } catch {
            // Se falhar ao parsear JSON, usa o texto da resposta
            try {
                const text = await response.text();
                errorMessage = text || errorMessage;
            } catch {
                // Se tudo falhar, mantém a mensagem padrão
            }
        }
        
        throw new Error(errorMessage);
    }
    
    return await response.json();
};

const useEfetuarLogin = () => {
    const setUsuario = useUsuarioStore(state => state.setUsuario);
    
    return useMutation<TokenResponse, Error, Usuario>({
        mutationFn: efetuarLogin,
        onSuccess: (data) => {
            if (data.token && data.id > 0) {
                setUsuario(data.id);
            }
        }
    });
};

export default useEfetuarLogin;