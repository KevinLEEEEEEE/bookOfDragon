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

  init() {
    try {
      this._initBtnEvents();
    } catch (e) {
      console.log('failed to init haffman.js, with error: ' + e);
    }
  }

  _initBtnEvents() {
    const haffman_A = document.getElementById('haffman_A');
    const haffman_B = document.getElementById('haffman_B');
    const haffman_C = document.getElementById('haffman_C');
    const haffman_D = document.getElementById('haffman_D');

    haffman_A.addEventListener('click', () => this._add('A'), true);
    haffman_B.addEventListener('click', () => this._add('B'), true);
    haffman_C.addEventListener('click', () => this._add('C'), true);
    haffman_D.addEventListener('click', () => this._add('D'), true);
  }

  _add(type) {
    if (this._isTypeExists(type) === true) {
      console.log('node ' + type + ' exists, add weight by one');

      this._addWeight(type);
    } else {
      console.log('node ' + type + ' doesn\'t exists, add new node to the list');

      this._addNode(type);
    }

    this._displayFinalResult();
  }

  _isTypeExists(type) {
    return Reflect.has(this.existNodeList, type);
  }

  _addWeight(type) {
    this.existNodeList[type].add();
  }

  _addNode(type) {
    const charNode = new CharNode(type);
    const emptyNode = new EmptyNode();

    this._addNodeToExistList(type, charNode);

    this.entryNode.setLeftChild(emptyNode);

    this.entryNode.setRightChild(charNode);

    this.entryNode = emptyNode; // update the entry node

    charNode.init();

    this._displayFinalResult();
  }

  _displayFinalResult() {
    const list = this._encodeFromList();

    console.log('');
    console.log('【Final】tree');
    console.log(this.rootNode);
    console.log('');
    console.log('【Final】encode');
    console.log(list);
    console.log('');
    console.log('------------------------------------------------');
  }

  _encodeFromList() {
    const codeList = {};

    const encode = (node, prevCode) => {
      if (node === null) {
        return;
      }

      if (node.isEmptyNode() === false) {
        const type = node.getType();

        codeList[type] = prevCode;

        return;
      }

      const leftNode = node.getLeftChild();
      const rightNode = node.getRightChild();

      encode(leftNode, prevCode + '0');
      encode(rightNode, prevCode + '1');
    };

    encode(this.rootNode, '');

    return codeList;
  }

  _addNodeToExistList(type, node) {
    this.existNodeList[type] = node;
  }
}