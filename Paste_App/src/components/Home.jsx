import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPastes, updatePastes } from '../redux/pasteSlice';

const Home = () => {
  //const [title, setTitle] = useState('');
  //const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find(p => p._id === pasteId);

const [title, setTitle] = useState(paste?.title || "");
const [value, setValue] = useState(paste?.content || "");




  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='flex flex-row gap-7'>
      <input
        className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
        type='text'
        placeholder='Enter title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={createPaste}
        className='p-2 rounded-2xl mt-2'
      >
        {pasteId ? 'Update Paste' : 'Create Paste'}
      </button>

      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          placeholder='Enter content'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
