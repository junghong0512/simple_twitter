import { dbService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweeet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweeet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  onChange={onChange}
                  placeholder={tweetObj.text}
                  value={newTweet}
                  required
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Tweet</button>
              <button onClick={onDeleteClick}>Delete Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
