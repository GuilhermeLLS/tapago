import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import ProfileEditRoute from '.'
import { renderWithRouter } from '../../test-utils'

vi.mock('../../clients/supabase', () => {
    return {
        supabase: {
            auth: {
                user: {
                    id: 1
                }
            },
            from: () => {},
            select: () => {},
            single: () => {
                return {
                    data: {
                        id: 1,
                        name: 'Test',
                        email: 'test@email.com',
                    }
                }
            },
        }
    }
})

describe('ProfileEditRoute', () => {
    it('render loading state in profile edit route', () => {
        renderWithRouter(<ProfileEditRoute />, '/profile-edit')

        const loading = screen.getByText('Loading...')
        expect(loading).toBeInTheDocument()
    })
})