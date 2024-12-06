import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteBlog, fetchBlogs } from "../redux/slices/blogSlice";
import LoadingComponent from "./LoadingComponent";
import { showSuccessAlert } from "../utils/alert";

const BlogListComponent = () => {
  const { blogs, pagination, error, loading } = useSelector((state) => state.blogs);
  const { currentPage, totalPages } = pagination;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs({ search, page, limit: 5 }));
  }, [dispatch, page, search]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .then(() => {
        showSuccessAlert();
        dispatch(fetchBlogs({ search, page, limit: 5 }));
      });
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <section className="space-y-5 px-20 mt-10">
      <div className="px-6 grid grid-cols-3 gap-4">
        <p className="text-lg font-semibold text-gray-600 col-span-1">
          <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span>Blog</span>
        </p>

        <div className="flex gap-3 col-span-2 justify-end">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => dispatch(fetchBlogs({ search, page: 1, limit: 5 }))}
            className="px-4 py-2 font-semibold text-white rounded-md bg-primary hover:bg-yellow-500 focus:outline-none"
          >
            Search
          </button>
          <Link
            to={"add"}
            className="px-4 py-2 font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Add
          </Link>
        </div>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="max-w-full mx-auto">
          <div className="m-5 bg-white border border-dashed border-stone-200 rounded-2xl">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-dark border-neutral-200">
                  <thead className="text-secondary-dark text-[0.95rem] font-semibold">
                    <tr>
                      <th className="pb-3 text-gray-600 text-center">ID</th>
                      <th className="pb-3 text-gray-600 text-center">TITLE</th>
                      <th className="pb-3 text-gray-600 text-center">DESCRIPTION</th>
                      <th className="pb-3 text-gray-600 text-center">PUBLISHED</th>
                      <th className="pb-3 text-gray-600 text-center">CREATED AT</th>
                      <th className="pb-3 text-gray-600 text-center">UPDATED AT</th>
                      <th className="pb-3 text-gray-600 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs?.map((blog, index) => (
                      <tr key={index} className="text-center">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{blog?.title}</td>
                        <td className="py-3">{blog?.description}</td>
                        <td className="py-3">{blog?.published ? "Yes" : "No"}</td>
                        <td className="py-3">{new Date(blog?.created_at).toLocaleString("id-ID")}</td>
                        <td className="py-3">{new Date(blog?.updated_at).toLocaleString("id-ID")}</td>
                        <td className="py-3 flex justify-center flex-wrap gap-1">
                          <Link to={`edit/${blog?.id}`} className="px-4 py-2 font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 focus:outline-none">
                            Edit
                          </Link>
                          <button onClick={() => handleDelete(blog?.id)} className="px-4 py-2 ml-2 font-semibold text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {blogs?.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">No blogs found.</p>
            </div>
          ) : (
            <div className="flex justify-between items-center p-4">
              <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className={`flex items-center font-semibold px-4 py-2 bg-gray-100 ${currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-200"} rounded-lg focus:outline-none`}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>

              <div className="border-4 rounded-lg px-4 py-1 text-gray-400">
                <p className="text-lg font-semibold text-gray-600">{currentPage} / {totalPages}</p>
              </div>

              <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`flex items-center font-semibold px-4 py-2 bg-gray-100 ${currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-200"} rounded-lg focus:outline-none`}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogListComponent;
