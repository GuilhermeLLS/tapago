import { useEffect, useState } from 'react'
import { supabase } from '../clients/supabase'
import quicksort from '../utils/quicksort/quicksort'

/* *
 * @function usePosts
 * @param {'Ascending' | 'Descending'} option - The order in which to sort the posts
 * @returns {Array} posts - An array of posts sorted by date
 */
export default function usePosts(option = 'Ascending') {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
        async function fetchPosts() {
            try {
                const { data, error } = await supabase.from('posts').select('*')
                if (error) {
                    throw error
                }
                setPosts(quicksort(data, option))
            } catch (error) {
                alert(error.message)
            }
        }
    }, [option])

    return posts
}
