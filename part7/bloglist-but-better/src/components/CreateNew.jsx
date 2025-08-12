import React, { useState } from "react";

const CreateNew = ({ handleNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNew = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    handleNew(blogObject);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            data-testid={"title-input"}
          />
        </div>

        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            data-testid={"author-input"}
          />
        </div>

        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            data-testid={"url-input"}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNew;
