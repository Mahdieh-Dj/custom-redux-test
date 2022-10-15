function groupBy(list, by) {
  return list.reduce((prev, current) => {
    const variant = current[by];
    if (!prev.hasOwnProperty(variant)) {
      prev[variant] = [];
    }
    prev[variant].push(current);
    return prev;
  }, {});
}

const list = [
  { name: "test1", age: 20 },
  { name: "test2", age: 30 },
  { name: "test3", age: 20 },
];
// console.log(groupBy(list, "age"));
const listTwoSum = [5, 2, 12, -1, 18, 1, 4, -3, 9];
function twoSum(list, k) {
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    for (let j = i + 1; j < list.length; j++) {
      const element2 = list[j];
      if (element + element2 === k) return [element, element2];
    }
  }
  return false;
}
// console.log(twoSum(listTwoSum, 17));
function findMissingNumber(list) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    const b = list[i + 1];
    if (b && b - a > 1) {
      result.push(a + 1);
    }
  }
  return result;
}
// console.log(findMissingNumber([1, 2, 4, 5, 7]));
function findDuplicates(list) {
  let cache = {};
  return list.reduce((prev, current) => {
    if (!cache.hasOwnProperty(current)) {
      cache[current] = false;
    } else if (!cache[current]) {
      cache[current] = true;
      prev.push(current);
    }
    return prev;
  }, []);
}
// console.log(findDuplicates([1, 2, 3, 4, 5, 1, 5, 7, 1,5]));
const list3 = [
  {
    name: "a",
    books: ["bible", "harry potter"],
    age: 20,
  },
  {
    name: "b",
    books: ["war and piece", "Romeo and"],
    age: 20,
  },
  {
    name: "c",
    books: ["lord of the ring", "the shining"],
    age: 20,
  },
];
function getBookCollection(list) {
  return list.reduce((prev, current) => {
    prev.push(...current["books"]);
    return prev;
  }, []);
}
// console.log(getBookCollection(list3));
