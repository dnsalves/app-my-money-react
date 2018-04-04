import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'

export default props => (
    <ReduxToastr 
        timeOut={5000}
        newestOnTop={true}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar />
)
