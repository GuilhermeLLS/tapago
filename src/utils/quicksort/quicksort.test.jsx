import { describe, it, expect } from 'vitest'
import quicksort from '../quicksort/quicksort'

const emptyPosts = [];

const oneRandomPost = [
    {
      user_id: 1,
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: new Date(),
      location: 'Unknown',
    },
]

const MultipleRandomPosts = [
    {
      user_id: 15,
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: new Date(2012, 0, 1),
      location: 'Unknown',
    },
    {
    user_id: 18,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2014, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: 10,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2009, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: 11,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2010, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: 4,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2005, 0, 1),
    location: 'Unknown',
    }
  ]

  const MultipleRandomPostsWithDuplicates = [
    {
      user_id: 15,
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: new Date(2012, 0, 1),
      location: 'Unknown',
    },
    {
    user_id: 18,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2014, 0, 1),
    location: 'Unknown',
    },
    {
      user_id: 4,
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: new Date(2005, 0, 1),
      location: 'Unknown',
    },
    {
    user_id: 10,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2009, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: 11,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2010, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: 4,
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2005, 0, 1),
    location: 'Unknown',
    }
  ]

describe('Quicksort', () => {
  it('should correctly sort an empty array', () => {
    
    const sorted = quicksort(emptyPosts);
    expect(sorted).toEqual([]);
  });

  it('should correctly sort an array with one element', () => {
    const sorted = quicksort(oneRandomPost);
    expect(sorted).toEqual(oneRandomPost);
  });

  it('should correctly sort an array with multiple elements', () => {
 
    const sorted = quicksort(MultipleRandomPosts);
    const expectedResult = MultipleRandomPosts.sort((p1, p2) => (p1.created_at > p2.created_at) ? 1 : (p1.created_at < p2.created_at) ? -1 : 0)

    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort an array with duplicate elements', () => {
    const sorted = quicksort(MultipleRandomPostsWithDuplicates);
    const expectedResult = MultipleRandomPostsWithDuplicates.sort((p1, p2) => (p1.created_at > p2.created_at) ? 1 : (p1.created_at < p2.created_at) ? -1 : 0)

    
    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort an already sorted array', () => {
    const sorted = quicksort(MultipleRandomPostsWithDuplicates);
    const expectedResult = MultipleRandomPostsWithDuplicates.sort((p1, p2) => (p1.created_at > p2.created_at) ? 1 : (p1.created_at < p2.created_at) ? -1 : 0)
    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort a reverse-sorted array', () => {
    const expectedResult = MultipleRandomPostsWithDuplicates.sort((p1, p2) => (p1.created_at > p2.created_at) ? 1 : (p1.created_at < p2.created_at) ? -1 : 0).reverse()

    const sorted = quicksort(expectedResult)
    expect(sorted).toEqual(expectedResult.reverse());
  });
});