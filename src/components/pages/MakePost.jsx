import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import PostPreview from '../post-feed/PostPreview';
import IconButton from '../helper/IconButton';
import { MdUpload } from 'react-icons/md';
import { uploadPost } from '../../unholy-abominations/simulatePosts';

function MakePost(props) {
    const {userInfo} = useOutletContext();
    const [image, setImage] = useState(null);
    const [previewPic, setPreviewPic] = useState(null);
    const [caption, setCaption] = useState('');
    const date = new Date();

    const onSubmit = async (e) => {
        e.preventDefault();
        const postTime = date.getTime();
        // Inculde a random integer in each post key to almost guarantee no key overlap
        const randomKey = Math.floor(Math.random() * 1000) + 1;
        const postData = {
            s3key: `${userInfo.username}-${postTime}-${randomKey}`,
            author: userInfo.username,
            time: postTime,
            caption: caption
        };
        try{
            await Storage.put(postData.s3key, image, {
                contentType: 'image/png',
            });
            await uploadPost(postData);
            window.alert('Post successfully uploaded!');
            //window.location.reload();
        } catch(error) {
            window.alert(`Error making post: ${error}`);
        }
        console.log(postData);
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewPic(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className='make-post'>
            {
                !!previewPic ? 
                    <Card>
                        <h3>Post Preview</h3>
                        <PostPreview 
                            userInfo={userInfo}
                            post={{
                                key: '',
                                image: previewPic,
                                author: userInfo.username
                            }}
                            captionChange={(e) => setCaption(e.target.value)}
                        />
                    </Card>
                    : 
                    <Card className='upload'>
                        <p>Upload an image</p>
                    </Card>
            }
            <form onSubmit={onSubmit}>      
                <label>
                    <input type='file' name='upload' accept='image/*' onChange={onImageChange}/>  
                </label>
                <IconButton 
                    className='upload-button'
                    type='submit' 
                    disabled={!image}
                    Icon={MdUpload}
                >
                    Upload
                </IconButton>
            </form>
        </div>
    );
}

export default MakePost;