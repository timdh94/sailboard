import './AddKeyboard.css';
import { useState } from 'react';

const formDefault = {
  boardName: '',
  isSplit: false,
  boardSize: '',
  manufacturer: '',
  description: ''
};

const AddKeyboard = () => {
  const [form, setForm] = useState(formDefault);
  const [file, setFile] = useState()
  const [serverRes, setServerRes] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    console.log('form submitted');
  };

  return (
    <div className='keyboard-form-container'>
      <h1 className='form-title'>Add Item</h1>
      {serverRes}
      <form className='add-keyboard-form' onSubmit={submitForm}>
        <label htmlFor='keyboard-name'>board name
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
        </label>
        <label htmlFor='keyboard-size'>board size
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
        </label>
        <label htmlFor='keyboard-manufacturer'>manufacturer
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
        </label>
        <label htmlFor='keyboard-description'>description
          <input
            type='text'
            name='description'
            id='keyboard-description'
            value={form.description}
            required={true}
            autoComplete='off'
            onChange={handleChange}
            spellCheck='false'
          />
        </label>
        <input type='file' name='file' onChange={fileChange}/>
        <input
          type='submit'
          name='add-keyboard'
          id='add-keyboard-button'
          value='add to collection'
        />
      </form>
    </div>
  )
};

export default AddKeyboard;