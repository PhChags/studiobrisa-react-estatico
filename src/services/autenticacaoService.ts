import { type UsuarioCadastroDTO } from "../interfaces/Usuario";
import type ErrorResponse from "../interfaces/ErrorResponse";

const BASE_URL = "http://localhost:8080/api/autenticacao";

export const cadastrarUsuario = async (dto: UsuarioCadastroDTO): Promise<void> => {
    const response = await fetch(`${BASE_URL}/cadastrar`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
    });
    
    if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar usuário");
    }
};