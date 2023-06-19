import { useState, useEffect } from 'react'
import Button from '../../components/button'
import SearchBar from '../../components/searchBar'
import usePosts from '../../hooks/usePosts'
import Post from '../../components/post'
import UploadPostForm from '../../components/upload-post-form'
import usePostModal from '../../hooks/usePostModal'

export default function HomeRoute() {
  const [sort, setSort] = useState()
  const posts = usePosts(sort)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isOpen, setIsOpen] = usePostModal()

  useEffect(() => {
    if (posts.length > 0) {
      const results = posts.filter((post) => post.caption.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, posts])

  function handleSortingChange(event) {
    if (event.value === 'Ascending') {
      setSort('Ascending')
    } else {
      setSort('Descending')
    }
  }

  function handleSuggestionClick() {
    const results = posts.filter((post) => post.caption.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }

  return (
    <div className="flex flex-col p-8">
      <UploadPostForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Upload
      </Button>
      <SearchBar onSuggestionClick={handleSuggestionClick} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="p-2 flex items-center justify-end">
        <label htmlFor="sortItems">Ordenar Lista</label>
        <select
          className="p-6"
          name="sortItems"
          id="sortItems"
          value={sort}
          onChange={(event) => handleSortingChange(event.target)}
        >
          <option value="Ascending">Mais antigo</option>
          <option value="Descending">Mais novo</option>
        </select>
      </div>
      {searchResults.length && searchResults.map((post) => <Post key={post.id} {...post} />)}
    </div>
  )
}
