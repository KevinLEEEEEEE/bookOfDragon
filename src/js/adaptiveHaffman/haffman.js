import EmptyNode from './node/emptyNode';
import CharNode from './node/charNode';

export default class Haffman {
  existNodeList = {};
  rootNode;
  entryNode;

  constructor() {
    this.rootNode = new EmptyNode();

    this.entryNode = this.rootNode;
  }

  add(type) {
    if (Reflect.has(this.existNodeList, type)) {
      // update current node weight

      this.existNodeList[type].add();
    } else {
      // add new node

      this._updateNewNode(type);
    }
  }

  _updateNewNode(type) {
    const charNode = new CharNode(type);
    const emptyNode = new EmptyNode();

    this.existNodeList[type] = charNode;

    this.entryNode.setRightChild(charNode);

    charNode.setParent(this.entryNode);

    this.entryNode.setLeftChild(emptyNode);

    emptyNode.setParent(this.entryNode);

    this.entryNode = emptyNode;

    // charNode.notifyParent(charNode);
  }
}