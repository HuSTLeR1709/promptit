import {connectDatabase} from '@utils/database'
import Prompt from '@models/prompt';

export const GET = async (req, {params})=>{
    console.log(params.id)
    try {

        await connectDatabase();
        const prompts = await Prompt.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(prompts), {status:200})
        
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong in fetching posts", 
            {status:500}
        )
    }
}