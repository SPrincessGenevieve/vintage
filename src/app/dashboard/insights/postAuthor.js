import React from 'react';

// This is a simple PostAuthor component
const PostAuthor = ({ name, profilePicture, bio }) => {
  return (
    <div className="post-author">
      {/* Profile picture */}
      {profilePicture && (
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="author-profile-picture"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      )}
      
      {/* Author's name */}
      <div className="author-details">
        <h4>{name}</h4>
        
        {/* Author's bio (optional) */}
        {bio && <p>{bio}</p>}
      </div>
    </div>
  );
};

export default PostAuthor;
