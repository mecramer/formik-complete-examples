import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup' // yup library is used with Formik for form validation
import TextError from './TextError'
import PropTypes from 'prop-types'

// the properties in initialValues correspond to the name properties in the form fields
// the social name/pair shows how to use nested objects when needed and use dot notation to refer to them in the Field component
const initialValues = {
    name         : 'Mark',
    email        : '',
    channel      : '',
    comments     : '',
    address      : '',
    social       : {
        facebook : '',
        twitter  : '',
    },
    phoneNumbers : [ '', '' ],
    phNumbers    : [ '' ],
}

// mocking of loading saved data
const savedValues = {
    name         : 'Mark',
    email        : 'm@example.com',
    channel      : 'Formik Forms',
    comments     : 'Welcome to Formik',
    address      : '245 Fifth Ave',
    social       : {
        facebook : 'FB',
        twitter  : 'TW',
    },
    phoneNumbers : [ '', '' ],
    phNumbers    : [ '' ],
}

// formiks onSubmit receives the values of the form as its argument
// onSubmitProps is a random name, it could have been props
const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

// yup's validation schema object
const validationSchema = Yup.object({
    name    : Yup.string().required('Required'),
    email   : Yup.string().email('Invalid email format').required('Required'),
    channel : Yup.string().required('Required'),
    address : Yup.string().required('Required'),
    social  : Yup.object({
        facebook : Yup.string().required('Required facebook'),
        twitter  : Yup.string().required('Required twitter'),
    }),
})

// showing how to validate for one field
const validateComments = (value) => {
    let error
    if (!value) {
        error = 'Required!'
    }
    return error
}
function YoutubeForm () {
    const [ formValues, setFormValues ] = useState(null)

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize // this prop decides whether your form can change values after initialized once
        >
            {(formik) => {
                console.log('Formik props', formik)
                return (
                    <Form>
                        <div className='form-control'>
                            <label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name' />
                            <ErrorMessage name='name' component={TextError} />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='email'>E-mail</label>
                            <Field type='email' id='email' name='email' />
                            {/* An alternate way than creating a custom component for the error message using the render pattern */}
                            <ErrorMessage name='email'>
                                {(errorMsg) => <div className='error'>{errorMsg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='channel'>Channel</label>
                            <Field
                                type='text'
                                id='channel'
                                name='channel'
                                placeholder='Youtube channel name'
                            />
                            <ErrorMessage name='channel' component={TextError} />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='comments'>Comments</label>
                            {/* validate prop here is for a custom field validation */}
                            <Field
                                as='textarea'
                                id='comments'
                                name='comments'
                                validate={validateComments}
                            />
                            <ErrorMessage name='comments' component={TextError} />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='address'>Address</label>
                            <FastField name='address'>
                                {/* render props pattern for more fine grained control */}
                                {(props) => {
                                    // console.log('Field render')
                                    // console.log('Render props', props)
                                    const { field, meta } = props
                                    return (
                                        <div>
                                            <input type='text' id='address' {...field} />
                                            {meta.touched && meta.error && <div>{meta.error}</div>}
                                        </div>
                                    )
                                }}
                            </FastField>
                        </div>

                        <div className='form-control'>
                            <label htmlFor='facebook'>Facebook profile</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                            <ErrorMessage name='social.facebook' component={TextError} />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='twitter'>Twitter profile</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                            <ErrorMessage name='social.twitter' component={TextError} />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='primaryPh'>Primary phone number</label>
                            <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                        </div>

                        <div className='form-control'>
                            <label htmlFor='secondaryPh'>Secondary phone number</label>
                            <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                        </div>

                        <div className='form-control'>
                            <label>List of phone numbers</label>
                            {/* FieldArray component to allow an undertimed number of items */}
                            <FieldArray name='phNumbers'>
                                {/* render props (function as children) pattern */}
                                {/* this gives us access to properties and methods to help us with array manipulation */}
                                {(fieldArrayProps) => {
                                    const { push, remove, form } = fieldArrayProps // get required methods to add and remove from the array
                                    const { values } = form // get the values from the form
                                    const { phNumbers } = values // get the phNumbers array to loop over
                                    // console.log('fieldArrayProps', fieldArrayProps)
                                    console.log('Form errors', form.errors)
                                    return (
                                        <div>
                                            {/* loop over the phone numbers to display and give plus/minus buttons to add or remove items from the array */}
                                            {phNumbers.map((phNumber, index) => (
                                                <div key={index}>
                                                    <Field name={`phNumbers[${index}]`} />
                                                    {index > 0 && (
                                                        <button
                                                            type='button'
                                                            onClick={() => remove(index)}
                                                        >
                                                            {' '}
                                                            -{' '}
                                                        </button>
                                                    )}
                                                    <button type='button' onClick={() => push('')}>
                                                        {' '}
                                                        +{' '}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }}
                            </FieldArray>
                        </div>
                        <button type='button' onClick={() => setFormValues(savedValues)}>
                            Load saved data
                        </button>
                        <button type='reset'>Reset</button>
                        <button
                            type='submit'
                            disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

// type checking, see https://www.npmjs.com/package/prop-types
YoutubeForm.propTypes = {
    field : PropTypes.object,
    meta  : PropTypes.object,
}

export default YoutubeForm
