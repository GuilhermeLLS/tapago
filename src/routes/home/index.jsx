import { useState } from 'react'
import Button from '../../components/button'
import usePosts from '../../hooks/usePosts'
import Post from '../../components/post'

export default function HomeRoute() {
  const [sort, setSort] = useState()
  const posts = usePosts(sort)

  function handleSortingChange(event) {
    if (event.value == 'Ascending') {
      setSort('Ascending')
    } else {
      setSort('Descending')
    }
  }
  return (
    <div className="flex flex-col p-8">
      <Button variant="primary" onClick={() => alert('replace me!!')}>
        Upload
      </Button>
      <div className="p-2 flex items-center">
        <label htmlFor="sortItems">Sort Itens</label>
        <select
          className="p-6"
          name="sortItens"
          id="sortItens"
          value={sort}
          onChange={(event) => handleSortingChange(event.target)}
        >
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      {posts.length && posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

