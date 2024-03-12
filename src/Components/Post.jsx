import React, { useRef } from 'react';

function Post({ title, paragraph, userName, index, onDelete, onImageUpload }) {
  const inputRef = useRef(null);

  const handleDelete = () => {
    onDelete(index, userName);
  };

  const handleImageUpload = () => {
   
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(index, file);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p>Comment: {paragraph}</p>
        <p>Posted by: {userName}</p>
        <div className="card-actions justify-end">
        
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
         
          <button className="btn" onClick={handleImageUpload}>Upload Image</button>
       
          <button className="btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
