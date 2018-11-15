
export default class Node2 {
  type;
  weight;
  parentNode = null;
  leftChild = null;
  rightChild = null;

  constructor(type, weight) {
    this.type = type;

    this.weight = weight;
  }

  add() {
    this.weight += 1;

    if (this.parentNode !== null) {
      this.parentNode.nodeCompare(this);
    }
  }

  isEmptyNode() {
    return this.type === 'empty';
  }

  setCharNode(node) {
    if (this._isLeftChildEmptyNode() === true) {
      this.rightChild = node;
    } else {
      this.leftChild = node;
    }

    node.setParent(this);
  }

  setEmptyNode(node) {
    if (this._isLeftChildEmptyNode() === true) {
      this.leftChild = node;
    } else {
      this.rightChild = node;
    }

    node.setParent(this);
  }

  setParent(node) {
    this.parentNode = node;
  }

  setLeftChild(node) {
    this.leftChild = node;
  }

  setRightChild(node) {
    this.rightChild = node;
  }

  getCharNode() {
    return this._isLeftChildEmptyNode() ? this.rightChild : this.leftChild;
  }

  getEmptyNode() {
    return this._isLeftChildEmptyNode() ? this.leftChild : this.rightChild;
  }

  getWeight() {
    return this.weight;
  }

  getParentNode() {
    return this.parentNode;
  }

  nodeWeightUpdate() {
    if (this.isEmptyNode() === true) {
      this._updateWeight();
    }

    if (this.parentNode !== null) {
      this.parentNode.nodeWeightUpdate();
    }
  }

  nodeCompare(targetNode) {
    if (this.rightChild === targetNode) {
      this._passUpNodeCompare(targetNode); // the direct parent of changed node has no need to compare
    } else {
      if (this._isNodeWeightLargerThanMyCharNode(targetNode)) {
        this._passUpNodeCompare(targetNode); // larget than me, pass through
      } else {
        this._handleNodeSwitch(targetNode); // smaller or the same, switch with child
      }
    }
  }

  _passUpNodeCompare(targetNode) {
    if (this.parentNode !== null) {
      this.parentNode.nodeCompare(targetNode);
    }
  }

  _handleNodeSwitch(targetNode) {
    const emptyNode = this.getEmptyNode();
    const charNode = emptyNode.getCharNode();
    const targetParentNode = targetNode.getParentNode();

    targetParentNode.setCharNode(charNode);

    emptyNode.setCharNode(targetNode);
  }

  _isNodeWeightLargerThanMyCharNode(node) {
    const charNode = this.getCharNode();
    const maxWeight = charNode.getWeight();
    const nodeWeight = node.getWeight();

    return nodeWeight > maxWeight;
  }

  _isLeftChildEmptyNode() {
    if (this.leftChild === null) {
      return true;
    } else {
      return this.leftChild.isEmptyNode() === true;
    }
  }

  _updateWeight() {
    let weight = 0;

    weight += this._getLeftChildWeight();

    weight += this._getRightChildWeight();

    this.weight = weight;
  }

  _getLeftChildWeight() {
    return this.leftChild !== null ? this.leftChild.getweight() : 0;
  }

  _getRightChildWeight() {
    return this.rightChild !== null ? this.rightChild.getweight() : 0;
  }
}