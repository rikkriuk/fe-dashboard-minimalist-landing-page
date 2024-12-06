import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addPortfolio, updatePortfolio } from "../redux/slices/portfolioSlice";
import LoadingComponent from "./LoadingComponent";
import { showSuccessAlert } from "../utils/alert";

const PorfolioInputComponent = ({ isEdit }) => {
   const { id } = useParams();
   const { portfolios, loading, error } = useSelector((state) => state.portfolio);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { values, setValues, handleChange } = useForm({
      title: "",
      content: "",
      banner: null,
   });
   const [errorValidation, setErrorValidation] = useState({});

   useEffect(() => {
      if (isEdit && portfolios.length > 0) {
         const editPortfolio = portfolios.find((portfolio) => portfolio.id === id);
         if (editPortfolio) {
            const { title, description, banner } = editPortfolio;
            setValues({
               title: title,
               content: description,
               banner: banner,
            });
         } else {
            alert("Portfolio not found");
            navigate("/dashboard/portfolio");
         }
      }
   }, [isEdit]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const errors = {};

      if (values.title.trim() === "") {
         errors.title = "Title is required";
      }

      if (values.content.trim() === "") {
         errors.content = "Content is required";
      }
      
      if (values.content.split("").length <= 11) {
         errors.content = "Content value minimum is 10 characters";
      }

      if (!values.banner) {
         errors.banner = "Banner is required";
      }

      setErrorValidation(errors);
      
      if (Object.keys(errors).length > 0) {
         setErrorValidation(errors);
         return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      
      if (values.banner) {
          formData.append("banner", values.banner);
      }
      if (isEdit) {
         dispatch(updatePortfolio({id, portfolio: values})).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
               showSuccessAlert();
               navigate("/dashboard/portfolio");
            }
         });
      } else {
         dispatch(addPortfolio(values)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
               showSuccessAlert();
               navigate("/dashboard/portfolio");
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
               <Link to="/dashboard/portfolio" className="text-blue-500 hover:underline">Portfolio</Link>
               <span className="mx-2 text-gray-400">&gt;</span>
               <span>Add</span>
            </p>

            <div className="flex gap-3 col-span-2 justify-end">
               <Link
                  to={"/dashboard/portfolio"} 
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
                           licenseKey: "GPL",
                           placeholder: "Enter content",
                        }}
                     />
                     {errorValidation?.content && <p className="text-sm text-red-500 mt-3">{errorValidation.content}</p>}
                  </div>

                  <div className="px-3">
                     <input
                        type="file"
                        accept="image/*"
                        name="banner"
                        disabled={loading}
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                     />
                     {values.banner && <img src={values.banner} alt="banner" className="h-48 object-cover mt-3" />}
                     {errorValidation?.banner && <p className="text-sm text-red-500 mt-3">{errorValidation.banner}</p>}
                     {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
                  </div>

                  <div className="px-3">
                     <button disabled={loading} type="submit" className={`px-4 py-2 font-semibold text-white rounded-md ${isEdit ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none`}
                     >{isEdit ? "Update" : "Add"}</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
   )
}

export default PorfolioInputComponent;