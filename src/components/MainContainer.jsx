import React, {useState} from 'react';
import style from './MainContainer.module.css';
import CategoryMainContainer from './CategoryList/CategoryMainContainer';
import ToDoListContainer from './TodoList/ToDoListContainer';
import {Category, chooseBackground, uuidv4} from '../helpers/util';

const MainContainer = () => {
  const [categoryMap, setCategoryMap] = useState(new Map([[uuidv4(), new Category('알고리즘', null)]]));
  const [selectedListId, setSelectedListId] = useState(0);
  const [searchState, setSearchState] = useState({isFocus: false, isEmpty: true, keyword: ''});

  const backgroundClass = chooseBackground(selectedListId);

  return (
    <div className={`${style.container} ${backgroundClass}`}>
      <CategoryMainContainer
        categoryList={categoryMap}
        setCategoryMap={setCategoryMap}
        setSelectedListId={setSelectedListId}
        setSearchState={setSearchState}
      />
      <ToDoListContainer
        categoryMap={categoryMap}
        selectedListId={selectedListId}
        setCategoryMap={setCategoryMap}
        searchState={searchState}
      />
    </div>
  );
};

export default MainContainer;
