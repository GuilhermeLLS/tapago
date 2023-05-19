import { useState, useEffect } from 'react'
import { supabase } from '../../clients/supabase'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from('posts').select('*')
      if (error) {
        throw error
      }
      setPosts(data)
    } catch (error) {
      alert(error.message)
    }
  }

  console.log(posts)

  return (
    <div className="p-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8" onClick={() => navigate('/')}>
        Upload
      </button>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

function Post(item) {

    return (
    <div className="p-4 border-b border-gray-200">
      <img src={item.photo} alt="Post" className="w-full h-64 object-cover mb-4 rounded-md" />
      <p>{item.caption}</p>
      <p>{item.location}</p>
      <p>{item.created_at}</p>
    </div>
  )
}

export default HomeScreen
