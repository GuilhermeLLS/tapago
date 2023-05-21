import { describe, expect, it, vi } from 'vitest'
import { signIn } from './supabase'

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => {
      return {
        auth: {
          user: () => {
            return {
              id: 1,
            }
          },
          signInWithPassword: () => {
            return {
              error: null,
            }
          },
        },
      }
    },
  }
})

describe('AddFriendsRoute', () => {
  it('signIn should return an object with error set to null when successful', async () => {
    const email = 'test@example.com'
    const password = 'password'

    const result = await signIn(email, password)
    expect(result.error).toBe(null)
  })

  //   it('uploadImage etc etc', async () => {
  //     // TODO change uri to local test-image.jpg
  //     const imageUri =
  //       'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.pinterest.com%2Fpin%2F606789749779588832%2F&psig=AOvVaw3SRhAPHNXJTLpmD3Emxi1x&ust=1684786651648000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj398Sdh_8CFQAAAAAdAAAAABAI'
  //     const caption = 'image description'

  //     const result = await uploadImage(imageUri, caption)
  //     console.log(result)
  //     expect(result.error).toBe(null)
  //   })
})
