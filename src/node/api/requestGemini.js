import Showdown from 'showdown';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from  '@google/generative-ai';

dotenv.config();

export default async function requestIA(req, res) {
    const genIA = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });
    const modelPro = genIA.getGenerativeModel({ model: 'gemini-2.5-flash'});

    if(req.method === 'POST'){
        const {input , contextGame} = req.body;

        try {
            const prompt = `Olha, tenho esse jogo ${contextGame} e queria saber sobre ${input}`;

            const result = await modelPro.generateContent(prompt);
            const response = result.response; 

            console.log('vai funfa');
            const convertText = new Showdown.Converter();
            const convertToHtml = convertText.makeHtml(response.text());
            
            res.status(200).json({ message: convertToHtml });
        } catch {
            console.error("Erro na requisição para a IA:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`O método ${req.method} não é permitido`);
    }
}