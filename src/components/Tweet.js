import React from "react";

const Tweet = ({ tweetObj, isOwner }) => (
  <div>
    <h4>{tweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Edit Tweet</button>
        <button>Delete Tweet</button>
      </>
    )}
  </div>
);

export default Tweet;
