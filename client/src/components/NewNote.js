// import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom'

const NewNote = (props) => {

    return(
        <div class="container">

            <div class="left">
                <h1>Create A Note</h1>
                <Link to="/">View All Notes</Link>
            </div>

            <div class="right">
                <form>
                    <div class="input">
                        <label>Title</label>
                        <input 
                            type="text"
                            name="title"
                            />
                    </div>

                    <div class="input">
                        <label>Date</label>
                        <input 
                            type="date"
                            name="date"
                            />
                    </div>
                    
                    <div class="input">
                        <label>Note</label>
                        <textarea name="note"></textarea>
                    </div>

                    <div class="submit">
                        <input type="submit" value="Add Note"/>
                    </div>
                </form>
            </div>

        </div>
    )


}

export default NewNote;