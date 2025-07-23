import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY); 
console.log('Está fora da função');

export default async function requestGemini(req, res){
    console.log('Está dentro da função');
    if (req.method !== 'POST') {
        return res.status(405).end(`O método ${req.method} não é permitido`);
    }

    const { input, contextGame } = req.body;

    if (!input || !contextGame) {
        return res.status(400).json({ message: "Faltando o texto de entrada e/ou o jogo escolhido" });
    }

    const modelFlash = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        console.log('entro no try');
        
        const prompt = `
            ## Especialidade
            Você é um especialista assistente em informações e meta para o jogo ${contextGame}.

            ## Tarefa
            Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas.

            ## Regras
            - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
            - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo".
            - Considere a data atual ${new Date().toLocaleDateString()}.
            - Faça pesquisas atualizadas sobre o patch atual baseada na data atual para dar uma resposta coerente.
            - Nunca responda itens que não tenha certeza que existam no patch atual ou anteriores do jogo ${contextGame}.

            ## Resposta
            - Economize na resposta, seja direto e responda em no máximo 500 caracteres.
            - Responda em markdown.
            - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo, lembre-se de ser direto.

            ## Exemplo de resposta
            Pergunta do usuário: melhor build para Rengar jungle
            Resposta: A build mais atual é:

            **Itens:** Glaive Sombria, Eclipse, Dança da Morte.  
            **Runas:** Eletrocutar, Impacto Repentino, Globos Oculares, Caça Incansável.

            ---

            Aqui está a pergunta do usuário: ${input}
            `;

        const result = await modelFlash.generateContent(prompt);
        const response = result.response;
        console.log(response);
        return res.status(200).json({ message: response.text() });
    } catch (error) {
        console.log('entro no catch');

        console.error("Erro na requisição para a IA:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}