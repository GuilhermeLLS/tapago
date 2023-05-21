import { useState, useEffect} from 'react'

import { supabase } from '../../clients/supabase'
import quicksort from '../../utils/quicksort'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
};

export default function HomeRoute() {
  const [posts, setPosts] = useState([])
  
  async function fetchPosts(option) {
    try {
      const { data, error } = await supabase.from('posts').select('*')
      if (error) {
        throw error
      }
      setPosts(quicksort(data,option))
    } catch (error) {
      alert(error.message)
    }
  }

  function handleSortingchangeChange(event){
    if (event.value == 'Ascending') {
      fetchPosts('Ascending')
    } else {
      fetchPosts('Descending')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="p-6">

      <div className="p-1"  style={divStyle}>
        <input
          className="border border-gray-200 rounded-md px-3 w-full py-2 mt-4"
          placeholder="Search"
          type="search"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="border border-gray-200 rounded-md px-3 py-2 mt-4">Search</button>
      </div>

      <div className="p-2" style={divStyle}>
        <p>Sort Itens</p>
        <select className="p-6"name="sortItens" id="sortItens" onChange={event => handleSortingchangeChange(event.target)}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
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


