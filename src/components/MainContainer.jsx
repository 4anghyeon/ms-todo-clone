import React, {useEffect, useState} from 'react';
import style from './MainContainer.module.css';
import CategoryMainContainer from './CategoryList/CategoryMainContainer';
import ToDoListContainer from './TodoList/ToDoListContainer';
import {chooseBackground} from '../helpers/util';

const MainContainer = () => {
  const LOCALSTORAGE_KEY = 'to-do-app-data';

  // 데이터의 모든 것. TODO: 이렇게 관리해도 될까..?
  const localData = new Map(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  const [categoryMap, setCategoryMap] = useState(localData);

  // 현재 선택된 목록 ID
  const [selectedListId, setSelectedListId] = useState(localData.keys().next().value ?? 0);

  // 검색 정보
  const [searchState, setSearchState] = useState({isFocus: false, isEmpty: true, keyword: ''});

  // categoryMap의 값이 변할 때 마다 로컬스토리지에 저장한다.
  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(Array.from(categoryMap.entries())));
  }, [categoryMap]);

  // 검색 / 중요 / 일반 마다 배경색을 다르게 지정
  const backgroundClass = chooseBackground(selectedListId);

  return (
    <div className={`${style.container} ${backgroundClass}`}>
      {/* Left Side */}
      <CategoryMainContainer
        categoryList={categoryMap}
        setCategoryMap={setCategoryMap}
        setSelectedListId={setSelectedListId}
        setSearchState={setSearchState}
      />
      {/* Right Side */}
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
