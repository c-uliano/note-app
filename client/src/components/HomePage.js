// import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom'

const HomePage = (props) => {

    return(
        <div class="container">

            <div class="left">
                <h1>Create A Note</h1>
                <Link to="/new/note">New Note</Link>
            </div>

            <div class="right">
                <p>Insert Content Here</p>
            </div>

        </div>
    )


}

export default HomePage;