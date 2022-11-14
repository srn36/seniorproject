import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '@aws-amplify/ui-react';
import Post from '../post-feed/Post';

function MakePost(props) {
    const {userInfo} = useOutletContext();
    const [image, setImage] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className='make-post'>
            <Card
                variation='elevated'
            >
                <h3>Post Preview</h3>
                <Post userInfo={userInfo} post={{image: image, author: (!!image ? userInfo.username : 'Upload an image')}} preview={true}/>
            </Card>
            <form onSubmit={onSubmit}>      
                <label>
                    <p>Select Image</p>
                    <input type = "file" name = "upload" accept = "image/*" onChange={e => onImageChange(e)}/>  
                </label>
                <div>
                    <button className='upload-button' type='submit'>
                        Upload Post
                    </button>
                </div>            
            </form>
        </div>
    );
}

export default MakePost;