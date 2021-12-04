export class BinTree {
  private root?: Node;

  public insert(item: number): void {
    if (!this.root) {
      this.root = new Node(item);
    } else {
      this.insertNode(this.root, item)
    }
  }

  public search(item: number): Node | undefined {
    if (!this.root) return undefined;
    return this.searchNode(this.root, item);
  }

  public remove(item: number): void {
    const node = this.search(item);
    if(!node) throw new Error("Node not found");

    if (!node.leftNode && !node.rightNode) {
      if(node.parent) {
        node.parent.removeChild(node)
      } else {
        this.root = undefined;
      }
    } else if (node.leftNode && node.rightNode) {
      const biggerNode = node.rightNode.findMin();
      if (biggerNode !== node.rightNode) {
        this.remove(biggerNode.item)
        node.item = biggerNode.item;
      } else {
        node.item = node.rightNode.item;
        node.rightNode = node.rightNode.rightNode;
      }
    } else {
      const childNode = node.leftNode || node.rightNode;

      if (node.parent) {
        node.parent.replaceChild(node, childNode);
      } else {
        Node.copyNode(childNode, node);
      }
    }
  }

  private insertNode(node: Node, item: number) {
    if (node.item > item) {
      if (!node.leftNode) {
        node.leftNode = new Node(item, node)
      } else {
        this.insertNode(node.leftNode, item)
      }
    } else if (!node.rightNode) {
      node.rightNode = new Node(item, node)
    } else {
      this.insertNode(node.rightNode, item)
    }
  }

  private searchNode(node: Node, item: number): Node | undefined {
    if (!node) return undefined;
    if (node.item === item) return node;

    if (node.item > item) {
      return this.searchNode(node.leftNode, item)
    } else {
      return this.searchNode(node.rightNode, item)
    }
  }

}

class Node {
  get item(): number {
    return this._item;
  }

  set item(value: number) {
    this._item = value;
  }

  get rightNode(): Node {
    return this._rightNode as Node;
  }

  get parent(): Node {
    return this._parent as Node;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set rightNode(value: Node | undefined) {
    this._rightNode = value;
  }
  get leftNode(): Node {
    return this._leftNode as Node;
  }

  set leftNode(value: Node | undefined) {
    this._leftNode = value;
  }

  private readonly _parent: Node | undefined;
  private _leftNode: Node | undefined;
  private _rightNode: Node | undefined;
  private _item: number;

  constructor(item: number, parent?: Node) {
    this._item = item;
    this._parent = parent;
  }

  public removeChild(nodeToRemove: Node) {
    if(this.leftNode && this.leftNode === nodeToRemove) {
      this.leftNode = undefined;
      return true;
    }

    if(this.rightNode && this.rightNode === nodeToRemove) {
      this.rightNode = undefined;
      return true;
    }

    return false;
  }
  public replaceChild(nodeToReplace: Node, replacementNode: Node) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if(this.leftNode && this.leftNode === nodeToReplace) {
      this.leftNode = replacementNode;
      return true;
    }

    if(this.rightNode && this.rightNode === nodeToReplace) {
      this.rightNode = replacementNode;
      return true;
    }

    return false;
  }

  public findMin(): Node {
   if (!this.leftNode) {
     return this;
   }

   return this.leftNode.findMin();
  }

  static copyNode(source: Node, target: Node) {
    target.leftNode = source.leftNode;
    target.rightNode = source.rightNode;
    target.item = source.item;
  }
}