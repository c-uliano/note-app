// import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom'

const ViewPage = (props) => {

    return(
        <div class="container">
            <div class="left">
                <h1>Note Title Goes Here</h1>
                <Link to="/">View All Notes</Link>
            </div>

            <div>
                <div class="right">
                    <p>Insert Content Here</p>
                    {/* <Link to="/edit/note/{id}">Edit Note</Link> */}
                </div>
            </div>
        </div>
    )


}

export default ViewPage;