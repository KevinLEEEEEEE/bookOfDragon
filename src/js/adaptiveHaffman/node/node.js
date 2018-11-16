
export default class Node {
  type;
  weight;
  parentNode = null;
  leftChild = null;
  rightChild = null;

  constructor(type, weight) {
    this.type = type;

    this.weight = weight;
  }

  init() {
    this.nodeWeightUpdateAndChildSwitch();
  }

  add() {
    this.weight += 1;

    if (this._canPassUpMessages() === true) {
      this.parentNode.nodeWeightCompare(this);

      this.parentNode.nodeWeightUpdateAndChildSwitch();
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

    node.setParent(this);
  }

  setRightChild(node) {
    this.rightChild = node;

    node.setParent(this);
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

  getType() {
    return this.type;
  }

  getParentNode() {
    return this.parentNode;
  }

  getLeftChild() {
    return this.leftChild;
  }

  getRightChild() {
    return this.rightChild;
  }

  nodeWeightUpdateAndChildSwitch() {
    this._weightUpdate();

    this._childSwitch();

    if (this._canPassUpMessages() === true) {
      this.parentNode.nodeWeightUpdateAndChildSwitch();
    }
  }

  nodeWeightCompare(targetNode) {
    if (this.rightChild === targetNode) {
      this._passUpnodeWeightCompare(targetNode); // the direct parent of changed node has no need to compare
    } else {
      if (this._isNodeWeightLargerThanMyCharNode(targetNode)) {
        this._passUpnodeWeightCompare(targetNode); // larget than me, pass through
      } else {
        this._handleNodeSwitch(targetNode); // smaller or the same, switch with child
      }
    }
  }

  _weightUpdate() {
    if (this.isEmptyNode() === true) {
      this._updateWeight();
    }
  }

  _childSwitch() {
    const leftWeight = this._getLeftChildWeight();
    const rightAWeight = this._getRightChildWeight();

    if (leftWeight > rightAWeight) {
      this._switchChildrenPositionOfSelf();
    }
  }

  _switchChildrenPositionOfSelf() {
    const right = this.rightChild;

    this.setRightChild(this.leftChild);

    this.setLeftChild(right);
  }

  _passUpnodeWeightCompare(targetNode) {
    if (this.parentNode !== null) {
      this.parentNode.nodeWeightCompare(targetNode);
    } else {
      this._handleSelfNodeSwitch(targetNode);
    }
  }

  _handleSelfNodeSwitch(targetNode) {
    const charNode = this.getCharNode();
    const targetParentNode = targetNode.getParentNode();

    if (this._isTargetNodeTheSameAsCharNode(targetNode, charNode)) {
      return;
    }

    console.log('switch targetNode: [ type: ' + targetNode.type + ' weight: ' + targetNode.weight + ' ]');
    console.log('with node: [ type: ' + charNode.type + ' weight: ' + charNode.weight + ' ]');

    targetParentNode.setCharNode(charNode);

    this.setCharNode(targetNode);
  }

  _handleNodeSwitch(targetNode) {
    const emptyNode = this.getEmptyNode();
    const charNode = emptyNode.getCharNode();
    const targetParentNode = targetNode.getParentNode();

    if (this._isTargetNodeTheSameAsCharNode(targetNode, charNode)) {
      return;
    }

    console.log('switch targetNode: [ type: ' + targetNode.type + ' weight: ' + targetNode.weight + ' ]');
    console.log('with node: [ type: ' + charNode.type + ' weight: ' + charNode.weight + ' ]');

    targetParentNode.setCharNode(charNode);

    emptyNode.setCharNode(targetNode);
  }

  _isTargetNodeTheSameAsCharNode(targetNode, charNode) {
    return targetNode === charNode;
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
    return this.leftChild !== null ? this.leftChild.getWeight() : 0;
  }

  _getRightChildWeight() {
    return this.rightChild !== null ? this.rightChild.getWeight() : 0;
  }

  _canPassUpMessages() {
    return this.parentNode !== null;
  }
}