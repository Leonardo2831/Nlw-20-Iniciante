import dotenv from 'dotenv';
import Showdown from 'showdown';
import { GoogleGenerativeAI } from  '@google/generative-ai';

dotenv.config();

export default async function requestIA(req, res) {
    const genIA = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });
    const modelFlash = genIA.getGenerativeModel({ model: 'gemini-2.0-flash'});

    if(req.method === 'POST'){
        const {input , contextGame} = req.body;

        if(!input || !contextGame){  
            return res.status(400).json({ message: "Faltando o texto de entrada e o jogo escolhido" });
        }

        try {
            const prompt = `Olha, tenho esse jogo ${contextGame} e queria saber sobre ${input}`;

            const result = await modelFlash.generateContent(prompt);
            const response = result.response; 

            const convert = new Showdown.Converter();
            const convertToHtml = convert.makeHtml(response.text());
            
            res.status(200).json({ message: convertToHtml });
        } catch(error) {
            console.error("Erro na requisição para a IA:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        console.log(process.env.API_KEY);
        res.status(405).end(`O método ${req.method} não é permitido`);
    }
}