const colorsMap = {
  pink: 1,
  rot: 2,
  braun: 3,
  blau: 4,
  schwarz: 5,
  grau: 6,
  gelb: 7,
};

type Maybe<T> = T | null;

type Colors = keyof typeof colorsMap;

type Key = `${Colors} ${number}`;

const leftKey = 'm_left';
const rightKey = 'm_right';
const valueKey = 'm_key';

class MyNode {
  [valueKey]: Key;
  [leftKey]: Maybe<MyNode> = null;
  [rightKey]: Maybe<MyNode> = null;

  constructor(key: Key) {
    this[valueKey] = key;
  }

  str(): string {
    let s = '';
    if (this[leftKey] != null) {
      s += `(${this[leftKey].str()}) `;
    }
    s += this[valueKey];
    if (this[rightKey] != null) {
      s += ` (${this[rightKey].str()})`;
    }
    return s;
  }
}

function parseKey(key: Key) {
  const [color, value] = key.split(' ');
  return [color as Colors, +value] as const;
}

function compareKeys(key1: Key, key2: Key) {
  const [color1, number1] = parseKey(key1);
  const [color2, number2] = parseKey(key2);

  if (color1 === color2) {
    return number1 < number2 ? leftKey : rightKey;
  }

  if (colorsMap[color1] < colorsMap[color2]) {
    return leftKey;
  }

  return rightKey;
}

function treeFind(node: MyNode, key: Key) {
  const [color, number] = parseKey(key);

  const middleKey = node[valueKey];
}

function buildTree(arr: Key[]) {
  let tree = new MyNode(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    const [color, number] = parseKey(arr[i]);
    let current: Maybe<MyNode> = tree;
    let parent: Maybe<MyNode> = null!;
    while (current) {
      parent = current;
      const keyField = compareKeys(arr[i], current[valueKey]);
      current = current[keyField];
    }
    const keyField = compareKeys(arr[i], parent[valueKey]);
    parent[keyField] = new MyNode(`${color} ${number}`);
  }
  return tree;
}

const arr: Key[] = [
  'pink 12',
  'schwarz 11',
  'grau 18',
  'schwarz 11',
  'schwarz 3',
];
const tree = buildTree(arr);
console.log(tree.str());
// Output: "pink 12 ((schwarz 3) schwarz 11 (grau 18))"