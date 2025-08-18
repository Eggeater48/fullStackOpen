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
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(sortBlogs());
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
      ...blog,
      user: blog.user[0].id,
      likes: blog.likes + 1,
    };

    const result = await blogService.addLike(updatedBlog);
    dispatch(
      // looks kinda scuffed but it does work.. so im not complaining..
      updateBlog({
        ...result,
        likes: blog.likes + 1,
      }),
    );
    dispatch(sortBlogs());
  };
};

export const deleteBlogButWayBetter = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(deleteBlog(blog.id));
  };
};

export const { setBlogs, appendBlog, sortBlogs, updateBlog, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
