import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export const signIn = async (email, password) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const uploadPost = async ({ imageUri, caption, location }) => {
  try {
    const userId = (await supabase.auth.getUser()).data.user.id
    // Gerar nome de arquivo com base na data e hora atuais
    const fileName = `/posts/${userId}/${Date.now()}.jpg`

    // Fazer upload do Blob para Supabase Storage
    const { error: uploadError, data } = await supabase.storage.from('pictures').upload(fileName, imageUri, {
      cacheControl: '3600',
      upsert: false,
    })

    if (uploadError) {
      console.log('uploadError', JSON.stringify(uploadError))
      throw uploadError
    }
    // Adicionar novo registro à tabela 'posts'
    const { error: insertError } = await supabase.from('posts').insert([
      {
        author_id: userId,
        photo: `storage/v1/object/public/pictures/${data.path}`,
        caption: caption,
        created_at: new Date(),
        location: location,
      },
    ])

    if (insertError) {
      console.log('insertError', insertError)
      throw insertError
    }

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
