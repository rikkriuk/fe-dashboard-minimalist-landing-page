import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchContacts } from "../redux/slices/contactSlice";
import LoadingComponent from "./LoadingComponent";
import { showSuccessAlert } from "../utils/alert";

const ContactListComponent = () => {
  const { contacts, pagination, error, loading } = useSelector((state) => state.contact);
  const { currentPage, totalPages } = pagination;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchContacts({ search, page, limit: 5 }));
  }, [dispatch, page, search]);

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
          <Link disabled={loading} to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
          <span disabled={loading} className="mx-2 text-gray-400">&gt;</span>
          <span>Contacts</span>
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
            disabled={loading}
            onClick={() => dispatch(fetchContacts({ search, page: 1, limit: 5 }))}
            className="px-4 py-2 font-semibold text-white rounded-md bg-primary hover:bg-yellow-500 focus:outline-none"
          >
            Search
          </button>
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
                     <th className="pb-3 text-gray-600 text-center">NAME</th>
                     <th className="pb-3 text-gray-600 text-center">MESSAGE</th>
                     <th className="pb-3 text-gray-600 text-center">PHONE</th>
                     <th className="pb-3 text-gray-600 text-center">CREATED AT</th>
                     <th className="pb-3 text-gray-600 text-center">ACTION</th>
                     </tr>
                  </thead>
                  <tbody>
                     {contacts?.map((contact, index) => (
                     <tr key={index} className="text-center">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{contact?.name}</td>
                        <td className="py-3">{contact?.email}</td>
                        <td className="py-3">{contact?.phone}</td>
                        <td className="py-3">{new Date(contact?.created_at).toLocaleString("id-ID", {
                           day: "2-digit",
                           month: "2-digit",
                           year: "numeric",
                           hour: "2-digit",
                           minute: "2-digit",
                        })}</td>
                        <td className="py-3 flex justify-center flex-wrap gap-1">
                           <Link to={`edit/${contact?.id}`} className="px-4 py-2 font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 focus:outline-none">
                           Edit
                           </Link>
                           <button onClick={() => handleDelete(contact?.id)} className="px-4 py-2 ml-2 font-semibold text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none">
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

         {contacts?.length === 0 ? (
            <div className="flex justify-center items-center h-40">
               <p className="text-gray-500">No contacts found.</p>
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

export default ContactListComponent;
