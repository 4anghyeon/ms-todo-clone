import React, {useState} from 'react';
import styles from './css/TodoListContainer.module.css';
import TodoRow from './TodoRow';
import {Todo} from '../../helpers/util';
import TodoContextMenu from './TodoContextMenu';

const ToDoListContainer = ({categoryMap, selectedListId, setCategoryMap}) => {
  const [showToDoListContextMenu, setShowToDoListContextMenu] = useState(false);
  const [contextInfo, setContextInfo] = useState({x: 0, y: 0});

  const selectedTodoList = categoryMap.get(selectedListId);

  const handleKeydown = event => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === 'Enter') {
      let value = event.target.value;
      if (value === '') return;
      let newTodoList = selectedTodoList.todoList;
      newTodoList.push(new Todo(value, (newTodoList[newTodoList.length - 1]?.index || 0) + 1, false));

      let newMap = new Map(categoryMap);
      newMap.get(selectedListId).todoList = newTodoList;
      setCategoryMap(newMap);

      event.target.value = '';
    }
  };

  let todoList = selectedTodoList?.todoList.filter(t => !t.isDone);
  let isDoneTodoList = selectedTodoList?.todoList.filter(t => t.isDone);

  const renderTodoList = list => {
    return list.map(todo => {
      return (
        <TodoRow
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

  return (
    <div className={styles.container}>
      {selectedListId !== 0 && (
        <>
          <header>
            <h1>{selectedTodoList.name}</h1>
          </header>
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
                <h3 className={styles.isDoneHeader}>완료됨</h3>
                <div className={`${styles.isDoneContainer}`}>
                  <section>{renderTodoList(isDoneTodoList)}</section>
                </div>
              </>
            )}
          </article>
          <input placeholder="작업 추가" onKeyDown={handleKeydown} />
        </>
      )}
    </div>
  );
};

export default ToDoListContainer;
