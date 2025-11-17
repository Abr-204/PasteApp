import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  // If paste not found
  if (!paste) {
    return (
      <div className="p-6 text-red-500 font-bold">
        Paste not found!
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-7">
      {/* Title */}
      <input
        className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
        type="text"
        value={paste.title}
        disabled
      />

      {/* Content */}
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPastes;
