/* eslint-disable @typescript-eslint/no-explicit-any */
import PostCard from '@/components/user/posts/postCard';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

export default function Posts() {
  const posts = useAppSelector(state => state.storeDetailsReducer.data.posts);
  const loading = useAppSelector(state => state.storeDetailsReducer.isLoading);
  const [pinnedPosts, setPinnedPosts] = useState<any>([]);
  const [unPinnedPosts, setUnPinnedPosts] = useState<any>([]);
  function getSortedPosts() {
    if (posts && posts.length > 0) {
      const pinnedPosts: any = posts.filter(
        (post: any) => post.is_pin === true,
      );
      const unPinnnedPosts: any = posts.filter(
        (post: any) => post.is_pin === false,
      );
      setPinnedPosts(pinnedPosts);
      setUnPinnedPosts(unPinnnedPosts);
    }
  }
  useEffect(() => {
    getSortedPosts();
  }, [posts]);

  function renderPosts() {
    return (
      <div className="flex custom-scrollbar flex-col mt-3 gap-y-3 max-h-[80vh] p-2 overflow-y-auto overflow-x-hidden">
        {posts?.length > 0 ? (
          (pinnedPosts.concat(unPinnedPosts) || []).map((post: any) => (
            <PostCard
              createdAt={post.createdAt}
              desc={post.desc}
              isPin={post.is_pin}
              key={post._id}
              postId={post._id}
              title={post.title}
              userId={post.user_id}
            />
          ))
        ) : (
          <div className="flex justify-center">Post not found</div>
        )}
      </div>
    );
  }

  return (
    <div>
      {!loading ? (
        renderPosts()
      ) : (
        <div className="flex justify-center">
          <p>Loading....</p>
        </div>
      )}
    </div>
  );
}
