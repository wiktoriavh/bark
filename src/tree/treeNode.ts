import type { TreeOptions, Node, NodeChildren } from './types';

export const createNode = <T>(
  value: T,
  createId: NonNullable<TreeOptions['createId']>
): Node<T> => {
  const id = createId();
  const nodeValue = value;
  let children: NodeChildren<T> = {};

  const getChildKeys = () => Object.keys(children);

  const append: Node<T>['append'] = (child: Node<T>) => {
    const lastKey = getChildKeys().pop();
    children[lastKey ? Number.parseInt(lastKey, 10) + 1 : 0] = child;
    return child;
  };

  const prepend: Node<T>['prepend'] = (child: Node<T>) => {
    const keys = getChildKeys();
    const updatedChildren: NodeChildren<T> = keys.reduce(
      (acc: Record<number, Node<T>>, cur) => {
        acc[Number.parseInt(cur, 10) + 1] = children[cur];
        return acc;
      },
      {}
    );
    updatedChildren[0] = child;
    children = updatedChildren;
    return child;
  };

  const insert: Node<T>['insert'] = (child: Node<T>) => {
    const keys = getChildKeys();

    return child;
  };

  const getValue = () => nodeValue;
  const getId = () => id;
  const getChildren = () => children;
  const getFirstChild = () => children[0] || null;
  const getLastChild = () =>
    children[Object.keys(children)[Object.keys(children).length - 1]] || null;

  return {
    getValue,
    getId,
    getChildren,
    getFirstChild,
    getLastChild,
    append,
    prepend,
    insert,
  };
};
