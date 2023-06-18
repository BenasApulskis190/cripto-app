interface Item {
  id: string | number;
}

export function joinArraysById(arr1: Item[], arr2: Item[]): Item[] {
  return arr1.map((item1) => {
    const item2 = arr2.find((item) => item.id === item1.id);
    return item2 ? { ...item1, ...item2 } : item1;
  });
}
