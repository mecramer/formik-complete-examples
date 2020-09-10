import React from 'react'
import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'
import PropTypes from 'prop-types'

function FormikControl (props) {
    const { control, ...rest } = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <TextArea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <RadioButtons {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        default:
            return null
    }
}

FormikControl.propTypes = {
    control : PropTypes.string,
}

export default FormikControl
