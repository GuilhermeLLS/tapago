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