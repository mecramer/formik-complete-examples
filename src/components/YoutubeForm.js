import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
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
    address : Yup.string().required('Required'),
    social  : Yup.object({
        facebook : Yup.string().required('Required facebook'),
        twitter  : Yup.string().required('Required twitter'),
    }),
})

function YoutubeForm () {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {/* Formik provides a submission helper function, handleSubmit */}
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
                    <Field as='textarea' id='comments' name='comments' />
                </div>

                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <Field name='address'>
                        {/* render props pattern for more fine grained control */}
                        {(props) => {
                            const { field, meta } = props
                            console.log('Render props', props)
                            return (
                                <div>
                                    <input type='text' id='address' {...field} />
                                    {meta.touched && meta.error && <div>{meta.error}</div>}
                                </div>
                            )
                        }}
                    </Field>
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

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

// type checking, see https://www.npmjs.com/package/prop-types
YoutubeForm.propTypes = {
    field : PropTypes.object,
    meta  : PropTypes.object,
}

export default YoutubeForm
