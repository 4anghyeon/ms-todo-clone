import React from 'react';
import style from './css/SearchMainContainer.module.css';
import common from '../css/CategoryCommon.module.css';

const SearchMainContainer = ({setSearchState, setSelectedListId}) => {
  const onHandleFocusInput = () => {
    document.querySelector(`.${common.selected}`)?.classList.add(common.selectedBlur);
    setSelectedListId('search');
    setSearchState(prev => {
      return {...prev, isFocus: true};
    });
  };

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
