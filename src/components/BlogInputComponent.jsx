import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, getBlogById, updateBlog } from "../redux/slices/blogSlice";
import validateBlog from "../utils/blogValidation";
import { showSuccessAlert } from "../utils/alert";
import LoadingComponent from "./LoadingComponent";

const BlogInputComponent = ({ isEdit }) => {
   const { id } = useParams();
   const { blog, loading, error } = useSelector((state) => state.blogs)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { values, setValues, handleChange } = useForm({
      title: "",
      content: "",
      meta_title: "",
      meta_desc: "",
      banner: "",
      published: true,
   });
   const [errorValidation, setErrorValidation] = useState({});
   
   useEffect(() => {
      if (isEdit) {
         dispatch(getBlogById(id))
         .then(() => {
            if (Object.keys(blog).length > 0) {
               const { title, content, meta_title, meta_desc, banner, published } = blog;
               setValues({
                  title: title,
                  content: content,
                  meta_title: meta_title,
                  meta_desc: meta_desc,
                  banner: banner,
                  published: published,
               });
            } else {
               alert("Blog not found");
               navigate("/dashboard/blog");
            }
         });
      }
   }, [isEdit]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validateBlog(values);
      
      if (Object.keys(errors).length > 0) {
         setErrorValidation(errors);
         return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("meta_title", values.meta_title);
      formData.append("meta_desc", values.meta_desc);
      formData.append("published", values.published);
      if (values.banner) {
          formData.append("banner", values.banner);
      }

      if (isEdit) {
         dispatch(updateBlog({ id, blog: formData })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
               showSuccessAlert();
               navigate("/dashboard/blog");
            }
         });
      } else {
         dispatch(addBlog(values)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
               showSuccessAlert();
               navigate("/dashboard/blog");
            }
         });
      }
   }

   if (loading) return <LoadingComponent />;

   return (
      <section className="space-y-5 px-20 mt-10">
         <div className="px-6 grid grid-cols-3 gap-4">
            <p className="text-lg font-semibold text-gray-600 col-span-1">
               <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
               <span className="mx-2 text-gray-400">&gt;</span>
               <Link to="/dashboard/blog" className="text-blue-500 hover:underline">Blog</Link>
               <span className="mx-2 text-gray-400">&gt;</span>
               <span>Add</span>
            </p>

            <div className="flex gap-3 col-span-2 justify-end">
               <Link
                  to={"/dashboard/blog"} 
                  className="px-4 py-2 font-semibold text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none"
               >
                  Back
               </Link>
            </div>
         </div>

      <div className="max-w-full mx-auto">
        <div className="m-5 bg-white border border-dashed border-stone-200 rounded-2xl">
          <div className="p-6">
            <div className="overflow-x-auto">
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 text-dark border-neutral-200">
                  <div className="px-3">
                     <label className="block mb-2 text-sm font-medium text-gray-600">
                     Title
                     </label>
                     <input
                     type="text"
                     placeholder="Enter title"
                     name="title"
                     value={values.title}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary ${loading ? "cursor-wait bg-gray-200" : ""}`}
                     disabled={loading}
                     />
                     {errorValidation?.title && <p className="text-sm text-red-500 mt-3">{errorValidation.title}</p>}
                  </div>

                  <div className="px-3">
                     <label className="block mb-2 text-sm font-medium text-gray-600">
                     Content
                     </label>
                     <CKEditor
                        editor={ClassicEditor}
                        data={values.content || ""}
                        disabled={loading}
                        onChange={(_, editor) => {
                           const data = editor.getData();
                           setValues({ ...values, content: data });
                        }}
                        config={{
                           toolbar: [
                               "heading",
                               "|",
                               "bold",
                               "italic",
                               "link",
                               "bulletedList",
                               "numberedList",
                               "blockQuote",
                               "insertTable",
                               "undo",
                               "redo",
                           ],
                           placeholder: "Enter content",
                        }}
                     />
                     {errorValidation?.content && <p className="text-sm text-red-500 mt-3">{errorValidation.content}</p>}
                  </div>

                  <div className="px-3">
                     <label className="block mb-2 text-sm font-medium text-gray-600">
                     META TITLE
                     </label>
                     <input
                     type="text"
                     placeholder="Enter meta title"
                     name="meta_title"
                     value={values.meta_title}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary ${loading ? "cursor-wait bg-gray-200" : ""}`}
                     disabled={loading}
                     />
                     {errorValidation?.meta_title && <p className="text-sm text-red-500 mt-3">{errorValidation.meta_title}</p>}
                  </div>

                  <div className="px-3">
                     <label className="block mb-2 text-sm font-medium text-gray-600">
                     META DESCRIPTION
                     </label>
                     <input
                     type="text"
                     placeholder="Enter meta description"
                     name="meta_desc"
                     value={values.meta_desc}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary ${loading ? "cursor-wait bg-gray-200" : ""}`}
                     disabled={loading}
                     />
                     {errorValidation?.meta_desc && <p className="text-sm text-red-500 mt-3">{errorValidation.meta_desc}</p>}
                  </div>

                  <div className="px-3">
                     <input
                        type="file"
                        accept="image/*"
                        name="banner"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                     />
                     {values?.banner && (
                        <div className="mt-2">
                           <img src={values.banner} alt="banner" className="h-40 w-40 object-cover" />
                        </div>
                     )}
                     {errorValidation?.banner && <p className="text-sm text-red-500 mt-3">{errorValidation.banner}</p>}
                     {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
                  </div>

                  <div className="px-3">
                     <button
                     type="submit"
                     className={`px-4 py-2 font-semibold text-white rounded-md ${isEdit ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none`}
                     >
                     {isEdit ? "Update" : "Submit"}
                     </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
   )
}

export default BlogInputComponent;