const validateBlog = (values) => {
  const errors = {};

  if (!values.title || values.title.trim() === "") {
    errors.title = "Title is required.";
  }

  if (!values.content || values.content.trim() === "") {
    errors.content = "Content is required.";
  }

  if (values.content.length < 11) {
    errors.content = "Content value minimum is 10 characters.";
  }

  if (!values.meta_title || values.meta_title.trim() === "") {
    errors.meta_title = "Meta title is required.";
  }

  if (!values.meta_desc || values.meta_desc.trim() === "") {
    errors.meta_desc = "Meta description is required.";
  }

  if (!values.banner) {
    errors.banner = "Banner image is required.";
  }

  return errors;
};

export default validateBlog;
