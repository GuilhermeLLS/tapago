import { useState, useEffect } from 'react'
import { supabase } from '../../clients/supabase'
import Button from '../../components/button'

export default function HomeRoute() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
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
  }, [])

  return (
    <div className="p-8">
      <Button variant="primary" onClick={() => alert('replace me!!')}>
        Upload
      </Button>
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
