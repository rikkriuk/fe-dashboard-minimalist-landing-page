import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "checkbox") {
      setValues({ ...values, [name]: !values[name] });
    } else if (type === "file") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return { values, setValues, handleChange };
};

export default useForm;
