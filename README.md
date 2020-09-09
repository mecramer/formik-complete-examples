# Formik

Formik is a small library that helps you deal with forms in React.

Formik helps with 3 main parts:

1. Managing form data - getting values in and out of the form state
2. Form submission
3. Form validation and displaying error messages

Formik helps you do all of these things in a scalable, perfomant and easier way.
ls

## Formik Components

* Formik - a replacement to the useFormik hook. Its a context provider component that provides the different properties and helper methods of the following 3 Formik components:
  1. import Formik
  2. wrap entire component with the formik component
  3. pass in: initialValues, validationSchema and onSubmit
* Form - this component replaces the htm form tag and does not need an onSubmit action. It automatically hooks into Formik's handleSubmit method.
* Field - The field component does 3 things:
  1. behind the scenes hooks up inputs to the top level formik component
  2. uses the name attribute to hook up with the Formik state
  3. by default, will render an input element
* ErrorMessage - behind the scenes, takes care of producing error message for the particular field indicated by the name prop, only if the field has been visited and an error exists
* FastField - this component is mainly meant for performance optimization. Recommended for consideration if your form has more than 30 fields or very complex validation requirements. When using this, the field only re-renders when that particular field changes. It should only be considered if a field is independent of all other fields and doesn't rely on thinbgs like isValidating, submitCount..

## Errors

Scenarios when Formik validation runs:
1. onChange - Formik runs validation after any change in the form
2. onBlur - When the onBlur event happens in the form
3. onSubmit - Whenever form submission is attempted. If the validation doesn't pass for all fields, the onSubmit handler doesn't get executed

Formik provides props to the Formik component to control the first two scenarios if you want to disable them:
1. validateOnChange={false}
2. validateOnBlur={false}