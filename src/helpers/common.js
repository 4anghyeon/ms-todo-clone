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

export class Group {
  constructor() {
    this.isOpen = false;
    this.children = [];
  }
}

export const SEARCH_ID = 'search';
export const IMPORTANT_ID = 'star';
export const IMPORTANT_HEADER_ID = 'star-header';
