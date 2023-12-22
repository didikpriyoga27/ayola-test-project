type Values = {name: string; email: string; username: string; password: string};

const useFormRegister = () => {
  const onSubmit = () => {};

  const validate = (values: Values) => {
    const errors: any = {};

    // Name validation
    if (!values.name) {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Username validation
    if (!values.username) {
      errors.username = 'Username is required';
    }

    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
    } else {
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      if (!/[a-z]/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      }

      if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      }

      if (!/\W|_/.test(values.password)) {
        errors.password = 'Password must contain at least one symbol';
      }
    }

    return errors;
  };

  return {onSubmit, validate};
};

export default useFormRegister;
