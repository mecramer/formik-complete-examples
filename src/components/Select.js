import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import PropTypes from 'prop-types'

function Select (props) {
    const { label, name, options, ...rest } = props

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} as='select'>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

Select.propTypes = {
    label   : PropTypes.string,
    name    : PropTypes.string,
    options : PropTypes.array,
}

export default Select
