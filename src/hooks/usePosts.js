import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../clients/supabase'

/* *
 * @function usePosts
 * @param {'Ascending' | 'Descending'} option - The order in which to sort the posts
 * @returns {Array} posts - An array of posts sorted by date
 */
export default function usePosts(option = 'Ascending') {
    const [posts, setPosts] = useState([])

    const fetchPosts = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: option === 'Ascending' })
            if (error) {
                throw error
            }
            setPosts(data)
        } catch (error) {
            console.error(error.message)
        }
    }, [option])

    useEffect(() => {
        const channel = supabase.channel('realtime posts').on('postgres_changes',
            { event: '*', schema: 'public', table: 'posts' },
            () => {
                fetchPosts()
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, fetchPosts])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return posts
}
