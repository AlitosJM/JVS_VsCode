import React,{useState,useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie'


function MovieForm(props) {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        setTitle(props.movie.title)
        setDescription(props.movie.description)
    },[props.movie])

    const updateClicked = () =>{
        console.log('update here')
        API.updateMovie(props.movie.id, {title, description},token['mr-token'])
        .then( resp =>  props.updatedMovie(resp) )
        .catch( error => console.log(error) )
    }

    const createClicked = () =>{
        console.log('update here')
        API.createMovie({title, description},token['mr-token'])
        .then( resp =>  props.movieCreated(resp) )
        .catch( error => console.log(error) )
    }

    const isDisable = title.length===0 || description.length===0;

    let mov = props.movie;

    return(
        <React.Fragment>
            {mov ? (
                <div>

                    <label htmlFor = "title"> Title </label><br/>
                    <input id="title" type="text" placeholder="title" value={title}
                        onChange={evt => setTitle(evt.target.value)}/>
                    <br/>

                    <label htmlFor = "description"> Description </label><br/>
                    <textarea id="description" type="text" placeholder="Description" value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    ></textarea>
                    <br/>
                    {
                      props.movie.id ?
                      <button onClick={updateClicked} disable={isDisable}> Update </button>:
                      <button onClick={createClicked} disable={isDisable}> Create </button>
                    }

                    
                </div>
                
            ):null}
        </React.Fragment>
    )
    
}

export default MovieForm;