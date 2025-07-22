import dotenv from 'dotenv';
import Showdown from 'showdown';
import { GoogleGenerativeAI } from  '@google/generative-ai';

dotenv.config();

export default async function requestIA(req, res) {

    if(req.method === 'POST'){
        const {question , contextGame} = req.body;

        if(!question || !contextGame){  
            return res.status(400).json({ message: "Faltando o texto de entrada e o jogo escolhido" });
        }

        const genIA = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });
        const modelFlash = genIA.getGenerativeModel({ model: 'gemini-2.0-flash'}); 

        try {
            let prompt = `
                ## Especialidade
                Você é um especialista assistente em informações e meta para o jogo ${contextGame}.

                ## Tarefa
                Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas.

                ## Regras 
                - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
                - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo".
                - Considere a data atual ${new Date().toLocaleDateString()}.
                - Faça pesquisas atualizadas sobre o patch atual baseada na data atual para dar uma resposta coerente.
                - Nunca responda itens que não tenha certeza que não exista no patch atual ou anteriores do jogo ${contextGame}.

                ## Resposta
                - Economize na resposta, seja direto e responda em no máximo 500 caracteres. 
                - Responda em markdown.
                - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo, lembre de ser direto.

                ## Exemplo de resposta
                Pergunta do usuário: melhor build para rengar jungle
                Resposta: A build mais atual é: \n\n **Itens:** \n\n coloque os itens aqui. \n\n **Runas:** \n\n exemplo de runas. \n\n

                ---
                Aqui está a pergunta do usuário: ${input}

            `;
            
            const result = await modelFlash.generateContent(prompt);
            const response = result.response;

            res.status(200).json({ message: response });
        } catch(error) {
            console.error("Erro na requisição para a IA:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        console.log(process.env.API_KEY);
        res.status(405).end(`O método ${req.method} não é permitido`);
    }
}