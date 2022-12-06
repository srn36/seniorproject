import React, { useEffect, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { 
    Card, 
    Divider, 
    Loader, 
    TextAreaField 
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import { RiDeleteBin2Line } from 'react-icons/ri';

function Post({ userInfo, post }) {
    const [postContent, setPostContent] = useState(
        <Card
            className='post-loader'
        >
            <Loader
                className='spin'
                scale='large'
            />
        </Card>
    );

    useEffect(() => {
        const deletePost = async (_e) => {
            if(window.confirm('Delete post?')) {
                const s3Key = post.key;
                await Storage.remove(s3Key);
                //TODO: Remove post from db
                setPostContent();
            }    
        }

        const setContent = async () => {
            const postURL = (post.key && post.key.length > 0) ? (await Storage.get(`${post.key}`)) : post.download_url;

            setPostContent(
                <div className='post-container'>
                    {
                        (userInfo.username === post.author) &&
                        <div className='delete-post'>
                            <button onClick={deletePost}>
                                <RiDeleteBin2Line/>
                            </button>
                        </div>
                    }
                    <div className='post'>
                        <img src={postURL} alt={post.author}/>
                        <Divider/>
                        <PostAuthorBar userInfo={userInfo} author={post.author} deletePost={deletePost} time={post.time} preview={false}/>
                        {
                            !!post.caption && 
                            post.caption.length > 0 &&
                            <>
                                <Divider/>
                                <TextAreaField
                                    className='caption'
                                    label='caption'
                                    defaultValue={post.caption}
                                    maxLength={50}
                                    rows={1}
                                    labelHidden
                                />
                            </>
                        }
                    </div>
                </div>
            );
        }

        setContent();
    }, [userInfo, post]);
    
    return postContent;        
}

export default Post;