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
import { removePost } from '../../unholy-abominations/simulatePosts';

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
                try {
                    const s3Key = post.key;
                    await Storage.remove(s3Key);
                    await removePost(s3Key, userInfo.username);
                    //TODO: Remove post from db
                    setPostContent();
                    window.alert('Post deleted successfully!');
                } catch(error) {
                    window.alert(`Error deleting post: ${error}`);
                }
            }    
        }

        const setContent = async () => {
            const keySplit = (!!post.key && post.key.length > 0) ? post.key.split('-') : [];
            const author = post.author || keySplit[0];
            const time = post.time || parseInt(keySplit[1]);
            const postURL = (!!post.key && post.key.length > 0) ? (await Storage.get(`${post.key}`)) : post.download_url;

            setPostContent(
                <div className='post-container'>
                    {
                        (userInfo.username === author) &&
                        <div className='delete-post'>
                            <button onClick={deletePost}>
                                <RiDeleteBin2Line/>
                            </button>
                        </div>
                    }
                    {
                        postURL?.length > 0 &&
                        (
                            <div className='post'>
                                <img src={postURL} alt=''/>
                                <Divider/>
                                <PostAuthorBar 
                                    userInfo={userInfo} 
                                    author={author} 
                                    deletePost={deletePost} 
                                    time={time} 
                                    preview={false}
                                />
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
                        )
                    }
                </div>
            );
        }

        setContent();
    }, [userInfo, post]);
    
    return postContent;        
}

export default Post;