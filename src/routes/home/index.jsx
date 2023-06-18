import { useState } from 'react'
import Button from '../../components/button'
import SearchBar from '../../components/searchBar'
import usePosts from '../../hooks/usePosts'

export default function HomeRoute() {
  const [sort, setSort] = useState()
  const posts = usePosts(sort)

  function handleSortingchangeChange(event) {
    if (event.value == 'Ascending') {
      setSort('Ascending')
    } else {
      setSort('Descending')
    }
  }

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  };

  return (
    <div className="flex flex-col p-8">
      <Button variant="primary" onClick={() => alert('replace me!!')}>
        Upload
      </Button>
      <SearchBar {...posts}/>
      <div className="p-2 flex items-center" style={divStyle}>
        <label htmlFor="sortItems">Sort Itens</label>
        <select
          className="p-6"
          name="sortItens"
          id="sortItens"
          value={sort}
          onChange={(event) => handleSortingchangeChange(event.target)}
        >
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
