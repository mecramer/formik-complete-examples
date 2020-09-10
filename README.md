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

## Disabling Submit Button

Two scenarios:
1. Validity of the form state - by default, Formik doesn't disable the button on page load. If you want it to do that add 'disabled={!(formik.dirty && formik.isValid)}' to the Submit button. Note though that this would not allow the form to be submitted with no changes.
2. Form submission in progress - Formik has a property callsed isSubmitting. We want to check if that property is true and if so, disable the button. In the submit button add disabled={formik.isSubmitting}. But, you also have to turn submitting property back to false in your onSubmit function, something like this - props.setSubmitting(false)

## Load Saved Data into Formik
1. Import the saved data object
2. Populate a state variable with the data
3. Inform Formik to use the saved values if present - initialValues={formValues || initialValues}
4. Tell Formik to re-enable initialization using a prop in the Formik component - enableReinitialize

## Fetch Values from an API
1. Show a Loading indicator until the API is finished
2. Update the state variable with the response
3. Render the formik component

## Resetting Form Data
1. To reset to initial values, add a button with a type of reset
2. You can also reset after form submission. In the onSubmit function, add 'onSubmitProps.resetForm()' where onSubmitProps is the name of your props variable

## Reusable Formik Controls
* FormikContainer component - created to test the input types
* FormikControl component - this component decides which of the form fields have to be rendered based on one prop
* Input
* TextArea
* Select
* RadioButtons
* Checkboxes
* DatePicker - this one, we are using the react-datepicker library