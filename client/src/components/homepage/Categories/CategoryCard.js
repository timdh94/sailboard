import './CategoryCard.css';
import React from 'react';

const CategoryCard = ({ category }) => {

  return (
    <div className='category-card-container'>
      <h1>{category.title}</h1>
      <div
        className='category-image'
        style={{
          backgroundImage: `url(${category.imgUrl})`
        }}
      />
    </div>
  )
};

export default CategoryCard;
