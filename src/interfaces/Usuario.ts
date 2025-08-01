export default interface Usuario {
    conta: string;
    senha: string;
}

export interface UsuarioCadastroDTO {
    conta: string;
    senha: string;
    confirmacaoSenha: string;
}