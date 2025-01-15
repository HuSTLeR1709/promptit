import { connectDatabase } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
    try {
        await connectDatabase();

        const promptId = params?.id;
        if (!promptId) {
            return new Response("Invalid or missing ID", { status: 400 });
        }

        const prompt = await Prompt.findById(promptId).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return new Response("Something went wrong in fetching the prompt", { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    try {
        await connectDatabase();
        
        const promptId = params?.id;
        if (!promptId) {
            return new Response("Invalid or missing ID", { status: 400 });
        }

        const { prompt, tag } = await req.json();

        const existsPrompt = await Prompt.findById(promptId);
        if (!existsPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existsPrompt.prompt = prompt;
        existsPrompt.tag = tag;
        await existsPrompt.save();

        return new Response(JSON.stringify(existsPrompt), { status: 200 });
    } catch (error) {
        console.error("PATCH Error:", error);
        return new Response("Something went wrong in updating the prompt", { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectDatabase();
        
        const promptId = params?.id;
        if (!promptId) {
            return new Response("Invalid or missing ID", { status: 400 });
        }

        await Prompt.findByIdAndDelete(promptId);

        return new Response("Successfully deleted the Prompt", { status: 200 });
    } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Something went wrong in deleting the prompt", { status: 500 });
    }
};
