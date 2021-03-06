import './AddKeyboard.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CollectionService from '../../../services/collectionService';

const formDefault = {
  boardName: '',
  isSplit: false,
  boardSize: '',
  manufacturer: '',
  description: '',
  switches: ''
};

const AddKeyboard = ({ setIsAdding }) => {
  const [form, setForm] = useState(formDefault);
  const [file, setFile] = useState()
  const [serverRes, setServerRes] = useState('');
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const submitForm = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken')

    const formData = new FormData();
    formData.append('image', file);
    for (const key in form) {
      formData.append(key, form[key]);
    }
    const res = await CollectionService.addKeyboard(formData, accessToken);
    if (res.board) {
      dispatch({ type: 'ADD_BOARD', payload: res.board });
      setForm(formDefault);
      return;
    }
    setServerRes(res.message);
  };

  return (
    <div className='keyboard-form-container'>
      <h1 className='form-title'>Add Item</h1>
      {serverRes}
      <form className='add-keyboard-form' onSubmit={submitForm}>
        <label htmlFor='keyboard-name'>board name</label>
          <input
            type='text'
            name='boardName'
            id='keyboard-name'
            value={form.boardName}
            required={true}
            autoComplete='off'
            onChange={handleChange}
            spellCheck='false'
          />
        <label htmlFor='keyboard-size'>board size</label>
          <input
            type='text'
            name='boardSize'
            id='keyboard-size'
            value={form.boardSize}
            required={true}
            autoComplete='off'
            onChange={handleChange}
            spellCheck='false'
          />
        <label htmlFor='keyboard-manufacturer'>manufacturer</label>
          <input
            type='text'
            name='manufacturer'
            id='keyboard-manufacturer'
            value={form.manufacturer}
            required={true}
            autoComplete='off'
            onChange={handleChange}
            spellCheck='false'
          />
        <label htmlFor='isSplit'>split board?
          <input
            name='isSplit'
            id='isSplit'
            type='checkbox'
            value={form.isSplit}
            onChange={() => {
              setForm({
                ...form,
                isSplit: !form.isSplit
              });
              console.log(form);
          }}
          /> 
        </label>
        <label htmlFor='keyboard-switches'>switches</label>
        <input
          name='switches'
          id='keyboard-switches'
          type='text'
          value={form.switches}
          onChange={handleChange}
        />
        <label htmlFor='keyboard-description'>description</label>
          <textarea
            name='description'
            id='keyboard-description'
            value={form.description}
            required={true}
            rows={5}
            autoComplete='off'
            onChange={handleChange}
            spellCheck='false'
          />
        <input type='file' name='file' onChange={fileChange}/>
        <div className='add-board-button-container'>
          <input
            type='submit'
            name='add-keyboard'
            id='add-keyboard-button'
            className='add-keyboard-button add-keyboard-list'
            value='add to collection'
          />
          <input
            type='button'
            name='cancel-button'
            className='add-keyboard-button add-keyboard-cancel'
            value='cancel'
            onClick={() => {setIsAdding(false)}}
          />
        </div>
      </form>
    </div>
  )
};

export default AddKeyboard;