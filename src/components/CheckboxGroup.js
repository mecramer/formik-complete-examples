import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import PropTypes from 'prop-types'

function CheckboxGroup (props) {
    const { label, name, options, ...rest } = props

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...rest}>
                {({ field }) => {
                    // console.log('Field', field)
                    return options.map((option) => {
                        return (
                            <React.Fragment key={option.key}>
                                <input
                                    type='checkbox'
                                    id={option.value}
                                    {...field}
                                    value={option.value}
                                    checked={field.value.includes(option.value)}
                                />
                                <label htmlFor={option.value}>{option.key}</label>
                            </React.Fragment>
                        )
                    })
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

CheckboxGroup.propTypes = {
    label   : PropTypes.string,
    name    : PropTypes.string,
    options : PropTypes.array,
}

export default CheckboxGroup
