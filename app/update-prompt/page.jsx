'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Extract the `id` query parameter safely
  const [promptId, setPromptId] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    setPromptId(id);
  }, []);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error('Failed to fetch prompt details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to update prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
    />
  );
};

export default EditPrompt;
