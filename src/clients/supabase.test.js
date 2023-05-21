import { describe, expect, it, vi } from 'vitest'
import { signIn } from './supabase'

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => {
      return {
        auth: {
          user: {
            id: 1,
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
})
