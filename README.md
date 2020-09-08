# Formik

Formik is a small library that helps you deal with forms in React.

Formik helps with 3 main parts:

1. Managing form data - getting values in and out of the form state
2. Form submission
3. Form validation and displaying error messages

Formik helps you do all of these things in a scalable, perfomant and easier way.
ls

Formik components:
* Formik - a replacement to the useFormik hook. Its a context provider component that provides the different properties and helper methods of the following 3 Formik components.
  1. import Formik
  2. wrap entire component with the formik component
  3. pass in: initialValues, validationSchema and onSubmit
* Form - this component replaces the htm form tag and does not need an onSubmit action. It automatically hooks into Formik's handleSubmit method.
* Field - The field component does 3 things:
  1. behind the scenes hooks up inputs to the top level formik component
  2. uses the name attribute to hook up with the Formik state
  3. by default, will render an input element
* ErrorMessage - behind the scenes, takes care of producing error message for the particular field indicated by the name prop, only if the field has been visited and an error exists
