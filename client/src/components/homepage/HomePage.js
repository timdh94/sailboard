import React from 'react';
import Banner from "./Banner/Banner";
import FreshItems from './FreshItems/FreshItems';
import Categories from './Categories/Categories';

const HomePage = () => {

  return (
    <div>
      <Banner />
      <FreshItems />
      <Categories />
    </div>
  )
};

export default HomePage;
