import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addTestimonial, updateTestimonial } from "../redux/slices/testimonialSlice";
import LoadingComponent from "./LoadingComponent";
import { showSuccessAlert } from "../utils/alert";

const TestimonialInputComponent = ({ isEdit }) => {
  const { id } = useParams();
  const { testimonials, loading, error } = useSelector((state) => state.testimonial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, setValues, handleChange } = useForm({
    name: "",
    title: "",
    foto_profile: null,
    message: "",
  });
  const [errorValidation, setErrorValidation] = useState({});

  useEffect(() => {
    if (isEdit && testimonials.length > 0) {
      const editTestimonial = testimonials.find((testimonial) => testimonial.id === id);
      if (editTestimonial) {
        const { name, title, foto_profile, message } = editTestimonial;
        setValues({
          name: name,
          title: title,
          foto_profile: foto_profile,
          message: message,
        });
      } else {
        alert("Testimonial not found");
        navigate("/dashboard/testimonial");
      }
    }
  }, [isEdit, id, testimonials, navigate, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (values.name.trim() === "") {
      errors.name = "Name is required";
    }

    if (values.title.trim() === "") {
      errors.title = "Title is required";
    }

    if (values.message.trim() === "") {
      errors.message = "Message is required";
    }

    if (values.message.length <= 11) {
      errors.message = "Message must be at least 10 characters";
    }

    if (!values.foto_profile) {
      errors.foto_profile = "Profile photo is required";
    }

    setErrorValidation(errors);

    if (Object.keys(errors).length > 0) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    if (values.foto_profile) {
      formData.append("foto_profile", values.foto_profile);
    }
    formData.append("message", values.message);


    if (isEdit) {
      dispatch(updateTestimonial({ id, testimonial: formData })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          showSuccessAlert();
          navigate("/dashboard/testimonial");
        }
      });
    } else {
      dispatch(addTestimonial(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          showSuccessAlert();
          navigate("/dashboard/testimonial");
        }
      });
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <section className="space-y-5 px-20 mt-10">
      <div className="px-6 grid grid-cols-3 gap-4">
        <p className="text-lg font-semibold text-gray-600 col-span-1">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link to="/dashboard/testimonial" className="text-blue-500 hover:underline">
            Testimonial
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span>{isEdit ? "Edit" : "Add"}</span>
        </p>

        <div className="flex gap-3 col-span-2 justify-end">
          <Link
            to={"/dashboard/testimonial"}
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
                  <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
                  />
                  {errorValidation?.name && <p className="text-sm text-red-500 mt-3">{errorValidation.name}</p>}
                </div>

                <div className="px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Title</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
                  />
                  {errorValidation?.title && <p className="text-sm text-red-500 mt-3">{errorValidation.title}</p>}
                </div>

                <div className="px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Message</label>
                  <textarea
                    placeholder="Enter message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
                  />
                  {errorValidation?.message && <p className="text-sm text-red-500 mt-3">{errorValidation.message}</p>}
                </div>

                <div className="px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="foto_profile"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {values?.foto_profile && <img src={values.foto_profile} alt="Profile" className="h-24 object-cover mt-3" />}
                  {errorValidation?.foto_profile && <p className="text-sm text-red-500 mt-3">{errorValidation.foto_profile}</p>}
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
  );
};

export default TestimonialInputComponent;
