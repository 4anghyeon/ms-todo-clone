import React from 'react';
import styles from './MainContainer.module.css';
import CategoryContainer from './Category/CategoryContainer';
import ToDoListContainer from './ToDoListContainer';

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <CategoryContainer />
      <ToDoListContainer />
    </div>
  );
};

export default MainContainer;
