import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    sortBlogs(state) {
      return state.toSorted((a, b) => {
        return b.likes - a.likes;
      });
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        return blog.id !== action.payload.id ? blog : action.payload;
      });
    },
  },
});

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const result = await blogService.createNew(content);
    dispatch(appendBlog(result));
    return result;
  };
};

export const voteBlogAndSortBlogsHandy2In1 = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user[0].id,
      likes: blog.likes + 1,
      id: blog.id,
    };
    console.log(updatedBlog);

    const result = await blogService.addLike(updatedBlog);
    dispatch(updateBlog(result));
    dispatch(sortBlogs());
  };
};

export const { setBlogs, appendBlog, sortBlogs, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
