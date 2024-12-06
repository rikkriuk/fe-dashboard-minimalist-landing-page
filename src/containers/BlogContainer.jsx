import react from "react";
import { useLocation } from "react-router-dom";
import BlogListComponent from "../components/BlogListComponent";
import BlogInputComponent from "../components/BlogInputComponent";

const BlogContainer = () => {
   const location = useLocation();
   const isAdd = location.pathname.includes("/add");
   const isEdit = location.pathname.includes("/edit");

  return (
   <section>
      {!isAdd && !isEdit && <BlogListComponent />}

      {(isAdd || isEdit) && <BlogInputComponent isEdit={isEdit} />}
   </section>
  );
};

export default BlogContainer;