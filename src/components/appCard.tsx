import type { Catalogue } from "../types/catalogue";
import DownloadIcon from "./downloadIcon";
import HyperlinkArrow from "./hyperlinkArrow";
import Star from "./star";
import Tags from "./tags";

export default function AppCard({
  item,
  special,
}: {
  item: Catalogue;
  special: boolean;
}) {
  return (
    <div
      key={item.id}
      className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-300 w-full relative flex flex-col justify-between ${special ? "bg-yellow-50" : ""}`}
    >
      <h3
        className={`text-lg font-semibold border-b pb-2 ${special ? "text-blue-900" : "text-gray-900"}`}
      >
        {special && "Featured App: "} {item.title}
      </h3>
      {item.description && (
        <p className="text-gray-800 mt-2 mb-3 text-sm leading-relaxed bg-gray-50 p-2 rounded">
          {item.description}
        </p>
      )}
      {item.content && (
        <p className="text-gray-700 mt-2 mb-3 text-sm leading-relaxed italic border-l-4 border-blue-200 pl-3">
          {item.content}
        </p>
      )}
      <div className="flex-grow"></div>
      {item.web_url && (
        <a
          href={item.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 underline font-medium transition-colors duration-200 flex items-center mt-1 mb-2"
        >
          <HyperlinkArrow />
          Visit Website
        </a>
      )}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="my-2 w-full max-w-xs rounded"
          loading="lazy"
          decoding="async"
          height="340"
        />
      )}
      <div className="flex-grow"></div>
      {item.youtube_url && (
        <div className="my-2 max-w-[340px]">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
            <div>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${item.youtube_url.split("v=")[1]?.split("&")[0] || item.youtube_url.split("/").pop()}?autoplay=0`}
                title={`${item.title} Review Video`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
                loading="lazy"
              ></iframe>
              {/* <a
                href={item.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md transition-colors duration-200"
              >
                View on YouTube
              </a> */}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Video Review</p>
        </div>
      )}
      {item.average_rating && (
        <div className="flex items-center mt-2">
          <Star />
          <span className="text-gray-700 font-medium">
            {item.average_rating > 0 ? item.average_rating.toFixed(1) : "NA"}
          </span>
        </div>
      )}
      {item.download_count !== undefined && (
        <>
          <div className="flex items-center mt-1 text-gray-600 text-sm">
            <DownloadIcon />
            <span>
              {item.download_count > 0
                ? item.download_count.toLocaleString()
                : "NA"}
              <span className="text-lg font-bold text-blue-800 ml-0.5">+</span>{" "}
              downloads
            </span>
          </div>
          <Tags tags={item.tags} />
        </>
      )}
    </div>
  );
}
