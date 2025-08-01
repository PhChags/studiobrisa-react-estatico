import { z } from "zod";

export const usuarioCadastroSchema = z.object({
  conta: z.string()
      .email("Deve ser um email válido")
      .min(5, "Email deve ter pelo menos 5 caracteres"),
  senha: z.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmacaoSenha: z.string()
}).refine(data => data.senha === data.confirmacaoSenha, {
  message: "As senhas não coincidem",
  path: ["confirmacaoSenha"]
});

export type UsuarioCadastroFormData = z.infer<typeof usuarioCadastroSchema>;