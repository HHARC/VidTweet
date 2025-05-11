import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';
import VideoCard from '../dashboard/VideoCard';

const RelatedVideos: React.FC = ({ videoId }: any) => {
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/videos/related/${videoId}`);
        setRelatedVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching related videos:', error);
      }
    };

    fetchRelatedVideos();
  }, [videoId]);

  return (
    <div className="related-videos">
      <h3 className="text-lg font-bold">Related Videos</h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
