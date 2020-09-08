import React from 'react'
import { useFormik } from 'formik' // the hook (function) formik provides
import * as Yup from 'yup' // yup library is used with Formik for form validation

// the properties in initialValues correspond to the name properties in the form fields
const initialValues = {
    name    : 'Mark',
    email   : '',
    channel : '',
}

// formiks onSubmit receives the values of the form as its argument
const onSubmit = (values) => {
    console.log('Form data', values)
}

// yup's validation schema object
const validationSchema = Yup.object({
    name    : Yup.string().required('Required'),
    email   : Yup.string().email('Invalid email format').required('Required'),
    channel : Yup.string().required('Required'),
})

function YoutubeForm () {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        // formiks validate function which automatically receives the form's values as input
        // 1.) the function must return an object
        // 2.) the keys of the object is that of the name attribute for the form field
        // 3.) a string value, indicating what the error is, should be assigned to the key
        // validate      : (values) => {
        //     // values.name, values.email, values.channel
        //     // errors.name, errors.email, errors.channel
        //     // errors.name = 'This field is required.'
        //     let errors = {}
        //     if (!values.name) {
        //         errors.name = 'Required'
        //     }
        //     if (!values.email) {
        //         errors.email = 'Required'
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email format.'
        //     }
        //     if (!values.channel) {
        //         errors.channel = 'Required'
        //     }

        //     return errors
        // },
    })

    // console.log('Form values', formik.values)
    // console.log('Form errors', formik.errors)

    // the touched object gives you information on whether a field has been visited or not
    console.log('Visited fields', formik.touched)

    return (
        <div>
            {/* Formik provides a submission helper function, handleSubmit */}
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    {/* formik.handleChange is formik's handler to change the form values, formik.values is the initial values */}
                    {/* this automatically calls the onSubmit method in the useFormik hook */}
                    <input
                        type='text'
                        id='name'
                        name='name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // this formik built in function handles the touched object
                        value={formik.values.name}
                    />
                    {/* show error message if error and the field has been visited (touched) */}
                    {formik.touched.name && formik.errors.name ? (
                        <div className='error'>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type='text'
                        id='channel'
                        name='channel'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.channel}
                    />
                    {formik.touched.channel && formik.errors.channel ? (
                        <div className='error'>{formik.errors.channel}</div>
                    ) : null}
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
