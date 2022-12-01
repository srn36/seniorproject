import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '@aws-amplify/ui-react';
import Post from '../post-feed/Post';

function MakePost(props) {
    const {userInfo} = useOutletContext();
    const [image, setImage] = useState(null);
    const date = new Date();

    const onSubmit = async (e) => {
        e.preventDefault();
        const postTime = date.getTime();
        const postData = {key: `${userInfo.username}-${postTime}`, author: userInfo.username, time: postTime};
        try {
            await Storage.put(`${userInfo.username}-${postTime}`, image, {
                contentType: 'image/png',
            });
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
        console.log(postData);
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className='make-post'>
            <Card variation='elevated'>
                <h3>Post Preview</h3>
                <Post userInfo={userInfo} post={{image: image, author: (!!image ? userInfo.username : 'Upload an image')}} preview={true}/>
            </Card>
            <form onSubmit={onSubmit}>      
                <label>
                    <input type='file' name='upload' accept='image/*' onChange={onImageChange}/>  
                </label>
                <div>
                    <button className='upload-button' type='submit' disabled={!image}>
                        Upload Post
                    </button>
                </div>            
            </form>
        </div>
    );
}

export default MakePost;