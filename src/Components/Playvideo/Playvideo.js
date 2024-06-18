
import React, { useEffect, useState } from 'react';
import './Playvideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import profile from '../../assets/user_profile.jpg';
import { API_KEY, value_convertor } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const Playvideo = () => {
  const {videoId}= useParams();
  const [apiData, setApiData] = useState({});
  const [channelData, setChannelData] = useState({});
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetailsUrl)
      .then(res => res.json())
      .then(data => setApiData(data.items[0] || {}));
  };

  const fetchOtherData = async () => {
    if (!apiData?.snippet?.channelId) return;
    const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDataUrl)
      .then(res => res.json())
      .then(data => setChannelData(data.items[0] || {}));
      
    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentUrl)
      .then(res => res.json())
      .then(data => setCommentData(data.items || []));
  };

  useEffect(() => {
    fetchVideoData();
     // eslint-disable-next-line
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
     // eslint-disable-next-line
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        title={apiData?.snippet?.title || "Video player"}
      ></iframe>
      <h3>{apiData?.snippet?.title || "Title Here"}</h3>
      <div className="play-video-info">
        <p>{apiData?.statistics?.viewCount ? value_convertor(apiData.statistics.viewCount) : "17K"} Views &bull; {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="Like" />{apiData?.statistics?.likeCount ? value_convertor(apiData.statistics.likeCount) : "155k"}</span>
          <span><img src={dislike} alt="Dislike" /></span>
          <span><img src={share} alt="Share" />Share</span>
          <span><img src={save} alt="Save" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || ""} alt="Channel" />
        <div>
          <p>{apiData?.snippet?.channelTitle || ""}</p>
          <span>{channelData?.statistics?.subscriberCount ? value_convertor(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?.snippet?.description ? `${apiData.snippet.description.slice(0, 280)}...` : "Description Here"}</p>
        <hr />
        <h4>{apiData?.statistics?.commentCount ? `${value_convertor(apiData.statistics.commentCount)} Comments` : "No Comments"}</h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || profile} alt="Profile" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3> 
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="Like" /> <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="Dislike" />
              </div>
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default Playvideo;
