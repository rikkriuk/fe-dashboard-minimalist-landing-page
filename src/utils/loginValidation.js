const loginValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Za-z0-9._%+-]+@/.test(values.email)) {
    errors.email = "Email must be a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};

export default loginValidation;
