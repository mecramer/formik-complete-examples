import React from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

function FormikControl (props) {
    const { control, ...rest } = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return
        case 'select':
            return
        case 'radio':
            return
        case 'checkbox':
            return
        case 'data':
            return
        default:
            return null
    }
}

FormikControl.propTypes = {
    control : PropTypes.string,
}

export default FormikControl
