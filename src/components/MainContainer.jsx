import React, {useState} from 'react';
import style from './MainContainer.module.css';
import CategoryMainContainer from './Category/CategoryMainContainer';
import ToDoListContainer from './TodoList/ToDoListContainer';
import {Category, uuidv4} from '../helpers/util';

const MainContainer = () => {
  const [categoryMap, setCategoryMap] = useState(new Map([[uuidv4(), new Category('알고리즘', null)]]));
  const [selectedListId, setSelectedListId] = useState(0);

  return (
    <div className={`${style.container} ${selectedListId === 'star' ? 'bg-important' : 'bg-normal'}`}>
      <CategoryMainContainer
        categoryList={categoryMap}
        setCategoryMap={setCategoryMap}
        setSelectedListId={setSelectedListId}
      />
      <ToDoListContainer categoryMap={categoryMap} selectedListId={selectedListId} setCategoryMap={setCategoryMap} />
    </div>
  );
};

export default MainContainer;
