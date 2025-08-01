import { useMutation } from "@tanstack/react-query";
import { type UsuarioCadastroDTO } from "../interfaces/Usuario";
import { cadastrarUsuario } from "../services/autenticacaoService";
import type ErrorResponse from "../interfaces/ErrorResponse";

const useCadastrarUsuario = () => {
    return useMutation<void, ErrorResponse, UsuarioCadastroDTO>({
        mutationFn: cadastrarUsuario,
        onSuccess: () => {
            // Sucesso tratado na página
        },
        onError: () => { 
            // Erro tratado no componente
        }
    });
};

export default useCadastrarUsuario;