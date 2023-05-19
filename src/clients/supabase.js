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

export const uploadImage = async (imageUri, caption) => {
  try {
    const userId = supabase.auth.user().id

    // Converter imagem local (no dispositivo) para um Blob
    const response = await fetch(imageUri)
    const blob = await response.blob()
    console.log('blob', blob)
    // Gerar nome de arquivo com base na data e hora atuais
    const fileName = `pictures/${userId}/${Date.now()}.jpg`

    // Fazer upload do Blob para Supabase Storage
    const { error: uploadError } = await supabase.storage.from('pictures').upload(fileName, blob)

    if (uploadError) {
      console.log('uploadError', JSON.stringify(uploadError))
      throw uploadError
    }

    // Adicionar novo registro à tabela 'posts'
    const { error: insertError } = await supabase.from('posts').insert([
      {
        user_id: userId,
        image_url: `/pictures/${fileName}`,
        caption: caption,
        created_at: new Date(),
        location: 'Unknown',
      },
    ])

    if (insertError) {
      console.log('insertError', insertError)
      throw insertError
    }

    return { success: true }
  } catch (error) {
    return { error: error }
  }
}
