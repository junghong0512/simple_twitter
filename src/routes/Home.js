import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);

  //   const getTweets = async () => {
  //     const dbTweets = await dbService.collection("tweets").get();
  //     dbTweets.forEach((document) => {
  //       const tweetObj = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setTweets((prev) => [tweetObj, ...prev]);
  //     });
  //   };

  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setText("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Upload" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
