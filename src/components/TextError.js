import React from 'react'
import PropTypes from 'prop-types'

function TextError (props) {
    return <div className='error'>{props.children}</div>
}

TextError.propTypes = {
    children : PropTypes.node,
}

export default TextError
