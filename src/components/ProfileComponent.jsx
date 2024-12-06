import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../utils/alert";
import { updateUser } from "../redux/slices/userSlice";
import loginValidation from "../utils/loginValidation";

const ProfileComponent = () => {
    const dispatch = useDispatch();
    const [errorValidation, setErrorValidation] = useState({});
    const profile = JSON.parse(localStorage.getItem("user"));

    const { values, handleChange } = useForm({
        name: profile.name || "",
        title: profile.title || "",
        password: "",
        linkedin_url: profile.linkedin_url || "",
        ig_url: profile.ig_url || "",
        photo: profile.photo,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.name.trim() === "") {
            setErrorValidation({ name: "Name is required" });
            return;
        }

        if (values.title.trim() === "") {
            setErrorValidation({ title: "Title is required" });
            return;
        }

        const passwordErrors = {};
        if (!values.password) {
            passwordErrors.password = "Password is required";
        } else if (values.password.length < 8) {
            passwordErrors.password = "Password must be at least 8 characters";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
            passwordErrors.password = "Password must contain at least one special character";
        }
        
        if (Object.keys(passwordErrors).length > 0) {
            setErrorValidation(passwordErrors);
            return;
        }

        const fromData = new FormData();
        for (let key in values) {
            fromData.append(key, values[key]);
        }

        dispatch(updateUser({ id: profile.id, profile: fromData}))
        .then(() => {
          showSuccessAlert();
        })

        setErrorValidation({});
    };

    return (
        <section className="flex mt-20 flex-col md:flex-row items-start bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex-1 mb-6 md:mb-0 md:mr-8">
                <div className="mb-4 text-center md:text-left">
                    <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-40 h-40 rounded-full mx-auto md:mx-0 object-cover border-4 border-primary"
                    />
                </div>

                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-sm text-gray-500 mb-2">{profile.title}</p>

                    <div className="mt-4 space-y-3">
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {profile.email}</p>
                        <p className="text-sm text-gray-600"><strong>Username:</strong> {profile.username}</p>
                        <p className="text-sm text-gray-600"><strong>Linked In:</strong> {profile.linkedin_url}</p>
                        <p className="text-sm text-gray-600"><strong>Intagram:</strong> {profile.ig_url}</p>
                        <p className="text-sm text-gray-600"><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Update Profile</h3>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errorValidation.password && (
                            <p className="text-red-500 text-sm">{errorValidation.password}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-600">LinkedIn Url</label>
                        <input
                            type="text"
                            id="linkedin_url"
                            name="linkedin_url"
                            value={values.linkedin_url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ig_url" className="block text-sm font-medium text-gray-600">Instagram Url</label>
                        <input
                            type="text"
                            id="ig_url"
                            name="ig_url"
                            value={values.ig_url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mb-4">
                     <input
                        type="file"
                        accept="image/*"
                        name="photo"
                        // disabled={loading}
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                     />

                     {values.photo && (
                        <img src={values.photo} alt="Profile pictures" className="mt-2 w-20 h-20 object-cover" />
                     )}
                  </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ProfileComponent;