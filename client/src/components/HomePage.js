import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const HomePage = (props) => {
    // * state
    const [list, setList] = useState([]);

    // TODO update api link
    // * get all items from database
    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
            .then(res => {
                setList(res.data)
                console.log(list) //prints empty array because state is updates late
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    // TODO update api link
    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                const filteredList = list.filter(item => item._id !== id)
                setList(filteredList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="container">
            
            <div className='row app-page'>
                <div className=" col-xs-12 col-md-5 font-google">
                   
                    <div>
                    <h1 class="title-block">Create<br />A<br />Note</h1>
                    </div>
                    <div class="navi-1">
                    <button class="button-note"><Link to="/new/note" className='button-note-text'>New Note</Link></button>
                    </div>
                    
                </div>  
                <div className=" col-xs-12 col-md-7">
                    <ul>
                    <div class="list-block">
                    {list.map((note) => {
                        return (
                          
                            <li>
                            <div class="">
                            <div className="text-spread" key={note._id}>
                                
                                <div className="">
                                    <h3><Link to={`/view/note/${note._id}`}><span class="text-table">{note.title}</span></Link></h3>
                                </div>
                                
                        
                                <div className="btn-group m-4" >
                                    <button class="btn btn-primary"><Link to={`/edit/note/${note._id}`}><span class="button-note-text">Edit</span></Link></button>&nbsp;
                                    <button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                                </div>
                                
                            </div>
                            </div>
                           </li>
                            
                        )
                       
                    })}
                    </div>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default HomePage;