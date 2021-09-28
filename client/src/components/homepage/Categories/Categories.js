import './Categories.css';
import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {

  const categories = [
    { title: 'Standard', imgUrl: 'http://localhost:3005/categories/standard.png' },
    { title: 'Split', imgUrl: 'http://localhost:3005/categories/split.jpeg' },
    { title: 'Keycaps', imgUrl: 'http://localhost:3005/categories/keycaps.png' },
    { title: 'Switches', imgUrl: 'http://localhost:3005/categories/switch.jpeg' }
  ];

  return (
    <div className='category-container'>
      <h1 className='category-title'>browse categories</h1>
      <div className='category-cards-container'>
        {categories.map((category, i) => (
          <CategoryCard category={category} key={i} />
        ))}
      </div>
    </div>
  )
};

export default Categories;