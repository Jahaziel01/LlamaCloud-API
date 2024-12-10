import 'dotenv/config';
import express from 'express';
import { LlamaParseReader } from "llamaindex";

/**
 * @description Llama Cloud API Key
 *  LLAMA_CLOUD_API_KEY=llx-XegOkBreOt3kok7R7wu9oV1cZzRwNmJGGrkCrLgLBITosj5t
 */ 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    async function main() {
        const path = "./example.pdf";
    
        const reader = new LlamaParseReader({ resultType: "markdown" });
        const documents = await reader.loadData(path);
    
        const result = documents[0].text;
        if (!result) {
            return res.status(404).json({message: 'Text not found'});
        }
    
        return res.status(200).json({message: result});
    }
    
    main().catch(console.error);
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});