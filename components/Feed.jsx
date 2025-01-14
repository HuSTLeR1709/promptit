'use client'
import { useEffect, useState } from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({data, handleClickTag})=> {
  return (
    <div className='mt-16 prompt_layout'>
    {data.map((post)=>(
      <PromptCard key={post._id} post={post} handleClickTag={handleClickTag}/>
    ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e)=> {

  }
  useEffect(()=>{
    const fetchPosts = async ()=> {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts();
  },[])
  return (
    <section className='feed'>
    <form className='relative w-full flex-center'>
    <input
      type='text'
      placeholder='Search for a tag or a username'
      value={searchText}
      onChange={handleSearchChange}
      className='search_input peer'
    />

    </form>
    <PromptCardList data={posts}
      handleClickTag={()=>{}}
    />

    </section>
  )
}

export default Feed