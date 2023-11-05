export const uuidv4 = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
};

export class Todo {
  constructor(categoryId, content, index, star) {
    this.parentId = categoryId;
    this.content = content;
    this.index = index;
    this.isDone = false;
    this.star = star;
  }
}

export class Category {
  constructor(name, group) {
    this.group = group;
    this.name = name;
    this.isEdit = false;
    this.todoList = [];
  }
}

export const chooseBackground = id => {
  switch (id) {
    case 'star':
      return 'bg-important';
    case 'star-header':
      return 'bg-important-100';
    case 'search':
      return 'bg-search';
    default:
      return 'bg-normal';
  }
};

export const chooseColor = id => {
  switch (id) {
    case 'star':
      return 'color-important';
    case 'star-header':
      return 'color-important-100';
    case 'search':
      return 'color-search';
    default:
      return 'color-normal';
  }
};
