import React from 'react';
import styles from './MainContainer.module.css';
import CategoryMainContainer from './Category/CategoryMainContainer';
import ToDoListContainer from './ToDoListContainer';

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <CategoryMainContainer />
      <ToDoListContainer />
    </div>
  );
};

export default MainContainer;
