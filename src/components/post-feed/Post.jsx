import React, { useEffect, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { 
    Card, 
    Divider, 
    Loader, 
    TextAreaField 
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

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
            const s3Key = post.key;
            await Storage.remove(s3Key);
            // Remove post from db
            setPostContent();
        }

        const setContent = async () => {
            let postURL = '';

            if(post.key && post.key.length > 0) {
                postURL = (await Storage.get(`${post.key}`));
            } else {
                postURL = post.download_url;
                // TEXT POST
            }

            setPostContent(
                <div className='post'>
                    <img src={postURL} alt={post.author}/>
                    <Divider/>
                    <PostAuthorBar userInfo={userInfo} author={post.author} deletePost={deletePost} preview={false}/>
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
            );
        }

        setContent();
    }, [userInfo, post]);
    
    return postContent;        
}

export default Post;