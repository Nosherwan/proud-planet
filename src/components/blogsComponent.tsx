import { useCallback, useEffect, useState, useRef } from "react";
import { getPosts } from "../fetchers/posts";
import BlogPreview from "../components/blogPreview";
import type { Post } from "../types/post";

interface BlogsProps {
  initial: { posts: Post[]; cursor: number; hasMore: boolean };
}

// Select a random color combination
const Blogs = ({ initial }: BlogsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(initial.posts);
  const [cursor, setCursor] = useState(initial.cursor);
  const [hasMore, setHasMore] = useState(initial.hasMore);
  // Add a loader ref to observe
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const {
        posts: { posts: newPosts, cursor: newCursor, hasMore: newHasMore },
      } = await getPosts(cursor);
      setCursor(newCursor);
      setHasMore(newHasMore);
      setPosts((prev: Post[]) => [...prev, ...newPosts]);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Unable to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [posts, loading]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchPosts, hasMore]);

  return (
    <>
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center mt-4 w-full">
        {posts?.map((item) => <BlogPreview key={item.id} item={item} />)}
      </div>
      {/* Loader element that triggers more posts when visible */}
      <div
        ref={loaderRef}
        className="h-10 w-full flex items-center justify-center my-4"
      >
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
        )}
      </div>

      {!hasMore && posts?.length > 0 && (
        <div className="text-gray-500 my-8">No more posts to load</div>
      )}
    </>
  );
};

export default Blogs;
