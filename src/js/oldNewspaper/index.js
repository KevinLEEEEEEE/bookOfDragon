// @ ts-check

import '../../css/oldNewspaper.css';

/**
 * @param {string} text
 * @returns {Array}
 */
const textSplit = (text) => text.split(' ');

class TextNode {
  node;

  /**
   * @param {string} text
   */
  constructor(text) {
    this.node = document.createElement('span');

    this.node.innerHTML = text + ' ';
  }

  display() {
    this.node.classList.add('textDisplay');

    this.node.classList.remove('textHide');
  }

  hide() {
    this.node.classList.remove('textDisplay');

    this.node.classList.add('textHide');
  }

  /**
   * @param {Node} node
   */
  setParent(node) {
    node.appendChild(this.node);
  }
}

class MagicText {
  chineseText;
  englishText;
  chineseNode;
  englishNode;
  displayNode;
  isEnglish = true;

  /**
  * @param {string} chinese
  * @param {string} english
  */
  constructor(chinese, english) {
    this.chineseText = chinese;

    this.englishText = english;

    this.displayNode = document.createDocumentFragment();

    this._initTextNode(chinese, english);
  }

  _initTextNode(chinese, english) {
    this.chineseNode = new TextNode(chinese);

    this.chineseNode.hide();

    this.chineseNode.setParent(this.displayNode);

    this.englishNode = new TextNode(english);

    this.englishNode.setParent(this.displayNode);
  }

  setParent(node) {
    node.appendChild(this.displayNode);
  }

  toggle() {
    if (this.isEnglish === true) {
      this.chineseNode.display();

      this.englishNode.hide();
    } else {
      this.chineseNode.hide();

      this.englishNode.display();
    }

    this.isEnglish = !this.isEnglish;
  }
}

(() => {
  const textNode = document.getElementById('text');
  const value = textNode.innerText;

  const splittedText = textSplit(value);

  const target = document.getElementById('textTarget');
  const frag = document.createDocumentFragment();
  let splittedNodeList = [];

  function randomDisplay() {
    const toggled = [];

    while (splittedNodeList.length > 0) {
      const i = Math.random() * splittedNodeList.length;
      const index = Math.floor(i) === splittedNodeList.length ? Math.floor(i) - 1 : Math.floor(i);
      const target = splittedNodeList.splice(Math.floor(index), 1)[0];

      target.toggle();

      toggled.push(target);
    }

    splittedNodeList = toggled;
  }

  target.addEventListener('click', () => {
    randomDisplay();
  });

  splittedText.forEach((text) => {
    const node = new MagicText('我', text);

    splittedNodeList.push(node);

    node.setParent(frag);
  });

  target.appendChild(frag);
})();