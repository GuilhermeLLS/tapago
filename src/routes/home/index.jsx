import { useState } from 'react'
import Button from '../../components/button'
import SearchBar from '../../components/searchBar'
import usePosts from '../../hooks/usePosts'
import Post from '../../components/post'
import UploadPostForm from '../../components/upload-post-form'
import usePostModal from '../../hooks/usePostModal'

export default function HomeRoute() {
  const [sort, setSort] = useState()
  const posts = usePosts(sort)
  const [isOpen, setIsOpen] = usePostModal()
  function handleSortingChange(event) {
    if (event.value == 'Ascending') {
      setSort('Ascending')
    } else {
      setSort('Descending')
    }
  }

  return (
    <div className="flex flex-col p-8">
      <UploadPostForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Upload
      </Button>
      <SearchBar {...posts} />
      <div className="p-2 flex items-center justify-end">
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
      {posts.length && posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  )
}
