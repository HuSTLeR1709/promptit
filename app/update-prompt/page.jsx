"use client"
import { Suspense, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter();
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(()=>{
        const getPromptDetails = async ()=> {
            if (!promptId) return;
            try {
                const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false)
            }
            
        }
        if(promptId) getPromptDetails()
    },[promptId])

    const updatePrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`,
            {
                method:'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id,
                })
            }
            )
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setSubmitting(false)
        }

    }
 if (isLoading) {
        return <div>Loading...</div>;
      }
  return (

        <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    ></Form>

    
  )
}

export default EditPrompt