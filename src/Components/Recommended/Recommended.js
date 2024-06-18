import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY } from '../../data';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(relatedVideoUrl);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found (404)');
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      }
      const data = await response.json();
      setApiData(data.items || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className='recommended'>
      {apiData.map((item) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id} className="side-video-list">
          <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
