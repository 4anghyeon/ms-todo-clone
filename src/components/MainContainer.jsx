import React, {useEffect, useState} from 'react';
import style from './MainContainer.module.css';
import CategoryMainContainer from './CategoryList/CategoryMainContainer';
import ToDoListContainer from './TodoList/ToDoListContainer';
import {chooseBackground} from '../helpers/util';

const MainContainer = () => {
  const [categoryMap, setCategoryMap] = useState(new Map(JSON.parse(localStorage.getItem('to-do-app-data'))));
  const [selectedListId, setSelectedListId] = useState(0);
  const [searchState, setSearchState] = useState({isFocus: false, isEmpty: true, keyword: ''});

  useEffect(() => {
    window.localStorage.setItem('to-do-app-data', JSON.stringify(Array.from(categoryMap.entries())));
  }, [categoryMap]);

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
