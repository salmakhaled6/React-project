
import React, { useState } from 'react';

function Edit({ addPost }) {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(title, paragraph);
  
    setTitle('');
    setParagraph('');
  };

  return (
    <div className="editpage">
      <h2 style={{ marginBottom: '30px' }}>Add Your Post !</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered input-secondary w-full max-w-xs"
          style={{ width: '100%', maxWidth: '500px', fontSize: '1.5rem', marginBottom: '30px' }}
        /><br />

        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="textarea textarea-accent"
          placeholder="Write something..."
          style={{ width: '100%', height: '200px', fontSize: '1.5rem', marginBottom: '30px' }}
        ></textarea><br />

        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;
