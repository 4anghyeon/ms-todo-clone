import React, {useState} from 'react';
import styles from './css/TodoListContainer.module.css';
import ToDoRow from './ToDoRow';
import {chooseBackground} from '../../helpers/util';
import TodoContextMenu from './TodoContextMenu';
import {Category, IMPORTANT_HEADER_ID, IMPORTANT_ID, SEARCH_ID, Todo} from '../../helpers/common';

const ToDoListContainer = ({categoryMap, selectedListId, setCategoryMap, searchState}) => {
  const [showToDoListContextMenu, setShowToDoListContextMenu] = useState(false);
  const [contextInfo, setContextInfo] = useState({x: 0, y: 0});

  let selectedTodoList = categoryMap.get(selectedListId);

  // 작업 입력 이벤트
  const handleKeydown = event => {
    // 한글 입력시 두번 이벤트 발생 감지
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === 'Enter') {
      let value = event.target.value;
      if (value === '') return;
      let newTodoList = selectedTodoList.todoList;
      newTodoList.push(new Todo(selectedListId, value, (newTodoList[newTodoList.length - 1]?.index || 0) + 1, false));

      let newMap = new Map(categoryMap);
      newMap.get(selectedListId).todoList = newTodoList;
      setCategoryMap(newMap);

      event.target.value = '';
    }
  };

  let todoList = [];
  let isDoneTodoList = [];

  if (searchState.isFocus && !searchState.isEmpty) {
    // 검색창에 포커스가 있으면서, 검색어가 있으면 검색 결과를 보여준다.
    selectedTodoList = new Category('검색 결과', null);
    for (const category of categoryMap.values()) {
      selectedTodoList.todoList = [
        ...selectedTodoList.todoList,
        ...category.todoList.filter(t => t.content.includes(searchState.keyword)),
      ];
    }
  } else if (selectedListId === IMPORTANT_ID) {
    // 중요 메뉴 선택시 중요로 선택한 목록만 보여준다.
    selectedTodoList = new Category('중요', null);
    for (const category of categoryMap.values()) {
      selectedTodoList.todoList = [...selectedTodoList.todoList, ...category.todoList.filter(t => t.star)];
    }
  }

  todoList = selectedTodoList?.todoList.filter(t => !t.isDone);
  isDoneTodoList = selectedTodoList?.todoList.filter(t => t.isDone);

  const renderTodoList = list => {
    return list.map(todo => {
      return (
        <ToDoRow
          key={todo.index}
          selectedListId={selectedListId}
          todo={todo}
          categoryMap={categoryMap}
          setCategoryMap={setCategoryMap}
          setShowContextMenu={setShowToDoListContextMenu}
          setContextInfo={setContextInfo}
        />
      );
    });
  };

  const backgroundClass = chooseBackground(selectedListId === IMPORTANT_ID ? IMPORTANT_HEADER_ID : selectedListId);

  return (
    <div className={styles.container}>
      {selectedListId !== 0 && (
        <>
          {selectedListId !== IMPORTANT_ID && (
            <header>
              <h1 className={selectedListId === IMPORTANT_ID ? 'color-important' : 'color-white'}>
                {selectedTodoList.name}
              </h1>
            </header>
          )}

          {(selectedListId !== SEARCH_ID || !searchState.isEmpty) && (
            <article className={styles.todoContainer}>
              {showToDoListContextMenu && (
                <TodoContextMenu
                  selectedListId={selectedListId}
                  setCategoryMap={setCategoryMap}
                  setShowContextMenu={setShowToDoListContextMenu}
                  contextInfo={contextInfo}
                />
              )}
              <section className={`${styles.notDoneContainer}`}>{renderTodoList(todoList)}</section>
              {isDoneTodoList.length > 0 && (
                <>
                  <h3 className={`${styles.isDoneHeader} ${backgroundClass}`}>완료됨</h3>
                  <div className={`${styles.isDoneContainer}`}>
                    <section>{renderTodoList(isDoneTodoList)}</section>
                  </div>
                </>
              )}
            </article>
          )}

          {!searchState.isFocus && selectedListId !== IMPORTANT_ID && (
            <input placeholder="작업 추가" onKeyDown={handleKeydown} />
          )}
        </>
      )}
    </div>
  );
};

export default ToDoListContainer;
