class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = removeDuplicate(sortArray(array));
    this.tree = buildTree(this.array);
  }
}

const odinArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const odinTree = new Tree(odinArray);
const originalTree = new Tree(odinArray);

console.log("Original array");
console.log(odinArray);

console.log("");
console.log("Creating tree");
console.log(odinTree.array);
console.log(odinTree.tree);

console.log("");
console.log("Inserting elements");
insertNode(odinTree.tree, 9);
insertNode(odinTree.tree, 10);
insertNode(odinTree.tree, 11);
insertNode(odinTree.tree, 500);
insertNode(odinTree.tree, 1000);
insertNode(odinTree.tree, 7000);
insertNode(odinTree.tree, 6500);
insertNode(odinTree.tree, 68);
insertNode(odinTree.tree, 0);

console.log("");
console.log("Deleting elements");
messageDel(odinTree.tree, 1);
messageDel(odinTree.tree, 23);
messageDel(odinTree.tree, 67);

console.log("");
console.log("Finding elements");
findNode(odinTree.tree, 8);
findNode(odinTree.tree, 68);
findNode(odinTree.tree, 9);
findNode(odinTree.tree, 70);

console.log("");
console.log("Breadth-first > Level Order -> transversal");
console.log(levelOrder(odinTree.tree));

console.log("");
console.log("Depth-first");
console.log(" > Preorder -> root, left, right");
console.log(depthFirst(odinTree.tree, "preorder"));
console.log(" > Inorder -> left, root, right");
console.log(depthFirst(odinTree.tree, "inorder"));
console.log(" > Postorder -> left, right, root");
console.log(depthFirst(odinTree.tree, "postorder"));

console.log("");
console.log("Height");
heightNode(odinTree.tree, 68);
heightNode(odinTree.tree, 1000);
heightNode(odinTree.tree, 8);
heightNode(odinTree.tree, 70);
heightNode(odinTree.tree, 0);

console.log("");
console.log("Balanced tree");
console.log("-> Balancing odinTree.tree (modified)");
isBalanced(odinTree.tree);
console.log("");
console.log("-> Balancing originalTree.tree (not modified)");
isBalanced(originalTree.tree);

console.log("");
console.log("Rebalance odinTree.tree");
const rebalanceOdin = rebalanceTree(odinTree.tree);
console.log(rebalanceOdin);

// ODIN TASKS

console.log("");
console.log("ODIN TASKS");
console.log("-> Random array");
const randomTree = createRandomTree();
console.log(randomTree.array);
console.log("-> Random tree");
console.log(randomTree.tree);

console.log("");
isBalanced(randomTree.tree);

console.log("");
console.log("Breadth-first > Level Order -> transversal");
console.log(levelOrder(randomTree.tree));

console.log("");
console.log("Depth-first");
console.log(" > Preorder -> root, left, right");
console.log(depthFirst(randomTree.tree, "preorder"));
console.log(" > Inorder -> left, root, right");
console.log(depthFirst(randomTree.tree, "inorder"));
console.log(" > Postorder -> left, right, root");
console.log(depthFirst(randomTree.tree, "postorder"));

// PRETTY PRINT
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log("");
console.log("ORIGINAL TREE");
prettyPrint(originalTree.tree);

console.log("");
console.log("ODIN TREE");
prettyPrint(odinTree.tree);

console.log("");
console.log("REBALANCE ODIN TREE");
prettyPrint(rebalanceOdin);

console.log("");
console.log("RANDOM TREE");
prettyPrint(randomTree.tree);

// ODIN REQUIRED FUNCTIONS
function createRandomTree() {
  const randomArray = [];

  for (i = 0; i <= 20; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    randomArray.push(randomNum);
  }

  const randomTree = new Tree(randomArray);
  return randomTree;
}

function rebalanceTree(node) {
  const newTree = buildTree(depthFirst(node, "inorder"));

  return newTree;
}

function isBalanced(node) {
  let rightDepth = levelOrder(node);
  rightDepth = rightDepth[rightDepth.length - 1];

  let leftDepth = depthFirst(node, "postorder");
  leftDepth = leftDepth[0];

  let diff;

  if (rightDepth > leftDepth) {
    diff = heightNode(node, rightDepth) - heightNode(node, leftDepth);
  } else {
    diff = heightNode(node, leftDepth) - heightNode(node, rightDepth);
  }

  if (diff > 1) {
    console.log(` > The tree is not balanced!`);
  } else {
    console.log(` > The tree is balanced!`);
  }
}

function heightNode(node, value) {
  let sum = 0;

  while (node !== null) {
    if (node.data > value) {
      sum++;
      node = node.left;
    } else if (node.data < value) {
      sum++;
      node = node.right;
    } else if (node.data === value) {
      break;
    }
  }

  if (node === null) {
    console.log(` > Value ${value} doesn't exist!`);
  } else {
    console.log(` > The height of the value ${value}, is ${sum}!`);
    return sum;
  }
}

function depthFirst(node, order) {
  const result = [];

  if (order === "preorder") {
    preorder(node);
  } else if (order === "inorder") {
    inorder(node);
  } else if (order === "postorder") {
    postorder(node);
  }

  return result;

  function postorder(node) {
    if (node === null) {
      return;
    } else {
      postorder(node.left);
      postorder(node.right);
      result.push(node.data);
    }
  }

  function inorder(node) {
    if (node === null) {
      return;
    } else {
      inorder(node.left);
      result.push(node.data);
      inorder(node.right);
    }
  }

  function preorder(node) {
    if (node === null) {
      return;
    } else {
      result.push(node.data);
      preorder(node.left);
      preorder(node.right);
    }
  }
}

function levelOrder(node) {
  const results = [];
  const queue = [];

  if (node === null) {
    return;
  } else {
    queue.push(node);

    while (queue.length > 0) {
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);

      results.push(queue[0].data);
      queue.shift();
    }
  }

  return results;
}

function findNode(node, value) {
  if (node === null) {
    console.log(` > Value ${value} doesn't exist!`);
    return;
  } else if (node.data === value) {
    console.log(` > Value ${value} was find!`);
    console.log(node);
    return;
  } else {
    if (node.data > value) {
      findNode(node.left, value);
    } else if (node.data < value) {
      findNode(node.right, value);
    }
  }
}

function messageDel(node, value) {
  deleteNode(node, value);
  console.log(` > Value ${value} was delete!`);

  function deleteNode(node, value) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      node.left = deleteNode(node.left, value);
      return node;
    } else if (node.data < value) {
      node.right = deleteNode(node.right, value);
      return node;
    }

    if (node.left === null) {
      let temp = node.right;
      delete node;
      return temp;
    } else if (node.right === null) {
      let temp = node.left;
      delete node;
      return temp;
    } else {
      let succParent = node;

      let succ = node.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;

      delete succ;
      return node;
    }
  }
}

function insertNode(node, value) {
  let currentNode = node;

  while (node !== null) {
    if (value < node.data) {
      currentNode = node;
      node = node.left;
    } else if (value > node.data) {
      currentNode = node;
      node = node.right;
    } else {
      console.log(` > Value ${value} already exist!`);
      return;
    }
  }

  if (value < currentNode.data) {
    currentNode.left = new Node(value);
  } else {
    currentNode.right = new Node(value);
  }

  console.log(` > Value ${value} was insert!`);
}

function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  } else {
    const mid = Math.floor(arr.length / 2);
    const data = new Node(arr[mid]);

    data.left = buildTree(arr.slice(0, mid));
    data.right = buildTree(arr.slice(mid + 1, arr.length));

    return data;
  }
}

// SORT AND REMOVE DUPLICATES FUNCTIONS
function removeDuplicate(arr) {
  const filterArray = [];
  arr.forEach((el, i) => {
    if (el === arr[i - 1]) {
      return;
    } else {
      filterArray.push(el);
    }
  });
  return filterArray;
}

function sortArray(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    const a = sortArray(arr.slice(0, Math.round(arr.length / 2)));
    const b = sortArray(arr.slice(Math.round(arr.length / 2)));
    const c = [];

    let i = 0;
    let j = 0;

    while (c.length < a.length + b.length) {
      if (a[i] < b[j] || j === b.length) {
        c.push(a[i++]);
      } else {
        c.push(b[j++]);
      }
    }

    return c;
  }
}
