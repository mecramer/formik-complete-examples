import React from 'react'
import { useFormik } from 'formik' // the hook (function) formik provides

function YoutubeForm () {
    const formik = useFormik({
        // the properties in initialValues correspond to the name properties in the form fields
        initialValues : {
            name    : 'Mark',
            email   : 'mecramer@yahoo.com',
            channel : 'React',
        },
        // formiks onSubmit receives the values of the form as its argument
        onSubmit      : (values) => {
            console.log('Form data', values)
        },
    })

    // console.log('Form values', formik.values)

    return (
        <div>
            {/* Formik provides a submission helper function, handleSubmit */}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                {/* formik.handleChange is formik's handler to change the form values, formik.values is the initial values */}
                {/* this automatically calls the onSubmit method in the useFormik hook */}
                <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />

                <label htmlFor='email'>E-mail</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <label htmlFor='channel'>Channel</label>
                <input
                    type='text'
                    id='channel'
                    name='channel'
                    onChange={formik.handleChange}
                    value={formik.values.channel}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
