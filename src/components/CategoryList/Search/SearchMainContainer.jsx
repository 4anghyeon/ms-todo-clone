import React from 'react';
import style from './css/SearchMainContainer.module.css';
import common from '../css/CategoryCommon.module.css';
import {SEARCH_ID} from '../../../helpers/common';

const SearchMainContainer = ({setSearchState, setSelectedListId}) => {
  // 검색창에 focus가 오면
  // 현재 selected css class를 찾아 배경 색을 더 연하게 만든다.
  // 현재 선택된 목록의 ID를 search로 지정한다.
  // 현재 검색에 focus됐다고 알린다.
  const onHandleFocusInput = () => {
    document.querySelector(`.${common.selected}`)?.classList.add(common.selectedBlur);
    setSearchState(prev => {
      if (!prev.isEmpty) setSelectedListId(SEARCH_ID);
      return {...prev, isFocus: true};
    });
  };

  // 검색어를 입력할 때마다 keyword와 isEmpty를 검사하여 변경한다.
  const onHandleChangeInput = event => {
    const value = event.target.value;
    setSearchState(prev => {
      return {...prev, ...{isEmpty: value === '', keyword: value}};
    });
  };

  return (
    <div className={style.container}>
      <span className={style.icon}>🔍</span>
      <input placeholder="검색" spellCheck={'false'} onFocus={onHandleFocusInput} onChange={onHandleChangeInput} />
    </div>
  );
};

export default SearchMainContainer;
