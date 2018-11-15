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

  isEmptyNode() {
    return this.type === 'empty';
  }

  getweight() {
    return this.weight;
  }

  getParentNode() {
    return this.parentNode;
  }

  getCharNode() {
    this.leftChild.isEmptyNode() === true ? this.rightChild : this.leftChild;
  }

  setLeftChild(child) {
    this.leftChild = child;
  }

  setRightChild(child) {
    this.rightChild = child;
  }

  setParent(parentNode) {
    this.parentNode = parentNode;
  }

  add() {
    this.weight += 1;

    this.updateNodePosition();

    // this.notifyParent(this);
  }

  updateWeight() {

  }

  notifyWeightUpdate() {

  }

  notifyParent(target) {
    if (this.parentNode !== null) {
      this.parentNode.update(target);
    }
  }

  updateNodePosition(changedTarget) {
    const myCharNode = this.getCharNode();

    if (myCharNode !== changedTarget) {
      const myWeight = myCharNode.getweight();
      const targetWeight = changedTarget.getweight();

      if (myWeight >= targetWeight) {
        // change with child

        this._switchNode(changedTarget);
      } else {
        // lift up for compare until root
        if (this.parentNode !== null) {
          this.parentNode.updateNodePosition(changedTarget);
        } else {
          // hit root

          this._switchNode(changedTarget);
        }
      }
    }
  }

  _switchNode(changedTarget) {
    const emptyNode = this.leftChild.isEmptyNode() === true ? this.leftChild : this.rightChild;
    const charNodeOfEmpty = emptyNode.leftChild.isEmptyNode() === true ? emptyNode.rightChild : emptyNode.leftChild;

    charNodeOfEmpty.setParent(changedTarget.getParentNode());

    const charNodeOfChangedNodeParent = changedTarget.getParentNode().leftChild.isEmptyNode() === true ? changedTarget.getParentNode().rightChild : changedTarget.getParentNode().leftChild;
  }

  _adapte(target) {
    // const leftWeight = this._getLeftChildWeight();
    // const rightWeight = this._getRightChildWeight();

    // if (rightWeight < leftWeight) {
    //   // change position

    //   const targetWeight = target.getweight();

    //   if (targetWeight > rightWeight) {
    //     // switch node

    //     this._switchNode(target);
    //   } else if (targetWeight === rightWeight) {
    //     // switch tree

    //     this._switchTree();
    //   }
    // } else {
    //   console.log(target);
    // }
  }

  // _switchNode(target) {
  //   target.parentNode.setRightChild(this.rightChild);

  //   this.rightChild.setParent(target.parentNode);

  //   this.rightChild = target;

  //   target.setParent(this);
  // }

  _switchTree() {
    const tmpLeftTree = this.leftChild;

    this.leftChild = this.rightChild;

    this.rightChild = tmpLeftTree;
  }

  update(target) {
    // this._updateWeight();

    if (this.rightChild !== target) {
      this._adapte(target);
    }

    this.notifyParent(target);
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