import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import PropTypes from 'prop-types'

function Input (props) {
    const { label, name, ...rest } = props

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

Input.propTypes = {
    label : PropTypes.string,
    name  : PropTypes.string,
}

export default Input
