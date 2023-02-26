import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    isError,
    data: videos,
  } = useQuery(["videos", keyword], async () => {
    return fetch(`/videos/${keyword ? "search" : "popular"}.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return (
    <>
      <div>videos {keyword ? `${keyword}` : `hot trend`}</div>
      {isLoading && <p>Loading....</p>}
      {isError && <p>Somethin is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
