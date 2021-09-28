import './BrowseAll.css';
import ListingService from '../../../services/listingService';
import KeyboardListing from '../KeyboardListing/KeyboardListing';
import React, { useEffect, useState } from 'react';

const formDefault = {
  searchValue: '',
  isSplit: false
};

const BrowseAll = () => {
  const [ogListings, setOgListings] = useState([]);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchForm, setSearchForm] = useState(formDefault);
  
  useEffect( () => {
    (async () => {
      const res = await ListingService.getAllListings();
      if (res.listings) {
        setOgListings(res.listings);
        setListings(res.listings);
      }
      setIsLoading(false);
    })();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const searchFilter = (e) => {
    e.preventDefault();
    const newListings = ogListings.filter(listing => {
      const searchTerm = searchForm.searchValue.toLowerCase();
      return listing.Keyboard.boardName.toLowerCase().includes(searchTerm) 
      || listing.Keyboard.manufacturer.toLowerCase().includes(searchTerm)
      || listing.Keyboard.description.toLowerCase().includes(searchTerm) 
      || listing.Keyboard.switches.toLowerCase().includes(searchTerm)
      || listing.itemLocation.toLowerCase().includes(searchTerm)
    });
    setListings(newListings);
  };
  
  const filterSplit = () => {
    const newListings = ogListings.filter(listing => (
      listing.Keyboard.isSplit !== searchForm.isSplit
    ));
    setListings(newListings);
  };
  
  if (isLoading) return (<></>);
  return (
    <>
      <div className='search-options-container'>
        <form onSubmit={searchFilter}>
          <label>search: 
          <input 
            className='search-bar-text' 
            type='text'
            name='searchValue'
            id='searchValue'
            value={searchForm.searchValue}
            onChange={handleChange}
          />
          </label>
        </form>
          <label>split board:
            <input
              className='is-split-box'
              type='checkbox'
              onChange={filterSplit}
            />
          </label>
      </div>
      <div className='browse-container'>
        {listings.map(listing => (
          <KeyboardListing 
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>
    </>
  )
};

export default BrowseAll;