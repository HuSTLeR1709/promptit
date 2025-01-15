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

  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  
    const filtered = posts.filter(
      (post) =>
        (post.tag && post.tag.toLowerCase().includes(searchValue.toLowerCase())) ||
        (post.creator.username && post.creator.username.toLowerCase().includes(searchValue.toLowerCase()))
    );
    setFilteredPosts(filtered);
  };

  const handleClickTag = (tag) => {
   
    const filtered = posts.filter(
      (post) => post.tag && post.tag.toLowerCase() === tag.toLowerCase()
    );
    setFilteredPosts(filtered);
    setSearchText(tag); 
  };
 
  useEffect(()=>{
    const fetchPosts = async ()=> {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
      setFilteredPosts(data)
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
    <PromptCardList data={filteredPosts}
      handleClickTag={handleClickTag}
    />

    </section>
  )
}

export default Feed