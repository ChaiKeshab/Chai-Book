# Login Validation Documentation

## Introduction
This documentation provides an overview of the React code used for login validation on the frontend using the Formik library and Yup schema validation. The code ensures that user input for username, email, and password meets specified criteria before submitting the form.

## Code Overview
The login validation code is organized into two parts: the form component and the validation schema.

### Form Component
- The form component is responsible for rendering the login form and handling user interactions.
- It uses the Formik library for form management, including form state, validation, and submission.
- The form fields include username, email, password, and confirm password.
- Validation errors are displayed below each input field when there are validation issues.
- The `handleSubmit` function is called when the user submits the form and logs the form data to the console if it passes validation.

### Validation Schema
- The validation schema is defined using Yup, a validation library.
- It specifies validation rules for each form field (username, email, password, and confirm password).
- Validation rules include minimum and maximum length requirements, email format validation, and password matching.
- If a validation rule is not met, an error message is displayed to the user.

## Usage
To use this code for login validation in your React application, follow these steps:

1. Define the initial form values in the `initialValues` object, including username, email, password, and confirm password.

```javascript
const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPass: "",
};
```

2. Create a Formik form and provide it with the initial values, validation schema, and submission handler.

```javascript
const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema, // Validate all data
    onSubmit: (val, action) => {
        console.log(val);
        action.resetForm(); // Reset form after successful submit
    },
});
```

3. Render the form fields and display validation errors as needed.

```javascript
<form action="" onSubmit={handleSubmit}>
    {/* Render form fields */}
</form>
```
### Validation Rules
The following validation rules are applied to the form fields:

- Username: Must be between 2 and 20 characters, and it is required.
- Email: Must be a valid email address format, and it is required.
- Password: Must be at least 6 characters in length, and it is required.
- Confirm Password: Must match the password field, and it is required.

### Conclusion
This React code for login validation using Formik and Yup provides a robust way to ensure that user input meets specified criteria before submitting the login form. By following the usage instructions outlined in this documentation, you can easily implement this validation in your React application.