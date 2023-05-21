export default function quicksort(arr, option = 'Ascending') {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const less = [];
    const equal = [];
    const greater = [];
    if(option == 'Ascending'){
      for (let element of arr) {
        if (element.created_at < pivot.created_at) {
          less.push(element);
        } else if (element.created_at > pivot.created_at) {
          greater.push(element);
        } else {
          equal.push(element);
        }
      }
    }else{
      for (let element of arr) {
        if (element.created_at > pivot.created_at) {
          less.push(element);
        } else if (element.created_at < pivot.created_at) {
          greater.push(element);
        } else {
          equal.push(element);
        }
      }
    }
    return [...quicksort(less), ...equal, ...quicksort(greater)];
  }

// -------------------------------------------------------------- TO DO ----------------------------------------------------------------------------

/*
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function sortItens(a,b){
    return b.created_at - a.created_at;
}

const emptyPosts = [];

const oneRandomPost = [
    {
      user_id: '0',
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: randomDate(new Date(2012, 0, 1), new Date()),
      location: 'Unknown',
    },
]

const MultipleRandomPosts = [
    {
      user_id: '0',
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: randomDate(new Date(2012, 0, 1), new Date()),
      location: 'Unknown',
    },
    {
    user_id: '1',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    },
    {
    user_id: '2',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    },
    {
    user_id: '3',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    },
    {
    user_id: '4',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    }
  ]

  const MultipleRandomPostsWithDuplicates = [
    {
      user_id: '0',
      image_url: '/pictures/test',
      caption: 'caption',
      created_at: randomDate(new Date(2012, 0, 1), new Date()),
      location: 'Unknown',
    },
    {
    user_id: '1',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2012, 0, 1),
    location: 'Unknown',
    },
    {
    user_id: '2',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    },
    {
    user_id: '3',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    location: 'Unknown',
    },
    {
    user_id: '1',
    image_url: '/pictures/test',
    caption: 'caption',
    created_at: new Date(2012, 0, 1),
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
    const expectedResult = MultipleRandomPosts.sort(sortItens(a,b))
    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort an array with duplicate elements', () => {
    const sorted = quicksort(MultipleRandomPostsWithDuplicates);
    const expectedResult = MultipleRandomPostsWithDuplicates.sort(sortItens(a,b))
    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort an already sorted array', () => {
    const sorted = quicksort(MultipleRandomPostsWithDuplicates);
    const expectedResult = MultipleRandomPostsWithDuplicates.sort(sortItens(a,b))
    expect(sorted).toEqual(expectedResult);
  });

  it('should correctly sort a reverse-sorted array', () => {
    const expectedResult = MultipleRandomPostsWithDuplicates.sort(sortItens(a,b))
    const sorted = quicksort(expectedResult.reverse())
    expect(sorted).toEqual(expectedResult);
  });
});
*/