import React from 'react';

function ProfilePictureUpload({ onImageChange }) {

    return (
        <>
            <h3>Upload Profile Picture</h3>
            <input
                type='file'
                accept='image/*'
                onChange={onImageChange}
            />
        </>
    );
}

export default ProfilePictureUpload;