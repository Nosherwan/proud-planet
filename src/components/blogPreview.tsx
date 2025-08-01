import type { Post } from "../types/post";
import Tags from "./tags";
import { format } from "date-fns";

export default function BlogPreview({ item }: { item: Post }) {
  return (
    <a
      href={`/blog/${item.slug}`}
      key={item.id}
      className="p-4 bg-white border border-gray-200 rounded-lg w-full mb-4 cursor-pointer hover:cursor-pointer no-underline text-inherit block"
    >
      <h2 className="text-xl font-bold mb-2 bg-white border-b pb-2">
        {item.title}
      </h2>
      <div className="mb-3 flex flex-col md:flex-row mt-4">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-64 h-48 object-cover object-top rounded-sm md:min-w-[300px]"
          />
        )}
        <div className="md:ml-4 w-full">
          {item.published_on !== undefined && (
            <time
              dateTime={new Date(Number(item.published_on) * 1000).toString()}
              className="text-gray-500 text-sm mb-2 mt-4"
            >
              {format(
                new Date(Number(item.published_on) * 1000),
                "MMMM d, yyyy",
              )}
            </time>
          )}
          {item.author && (
            <p className="text-sm mb-2 italic text-gray-500">
              By: {item.author}
            </p>
          )}
          {item.excerpt && (
            <p className="text-gray-800 mt-2 mb-3 text-sm leading-relaxed bg-gray-50 p-2 rounded w-full">
              {item.excerpt}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              <Tags tags={item.tags} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 py-2 px-3 bg-gray-100 border-t border-gray-200 mx-[-1rem] mb-[-1rem] rounded-b-lg flex items-center justify-center text-purple-700 font-medium">
        <span className="mr-2">Read full article</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </a>
  );
}
