/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { fetchUserPosts } from '@/redux/features/user/user-posts-slice';
import PostCard from '@/components/user/posts/postCard';
import AddEditPost from './addEditPost';

const PostSection = () => {
  const userId = useAppSelector(
    state => state.userDetailsReducer?.user?.user_id,
  );
  const posts = useAppSelector(state => state.userPostReducer.posts);
  const [postId, setPostId] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      getPosts();
    }
  }, [userId]);
  function getPosts() {
    dispatch(fetchUserPosts(userId));
  }
  function renderAllPosts() {
    return (
      <div className="flex custom-scrollbar flex-col mt-3 gap-y-3 max-h-[280px] p-2 overflow-y-auto overflow-x-hidden">
        {posts &&
          posts.length > 0 &&
          posts.map((post: any) => (
            <PostCard
              createdAt={post.createdAt}
              desc={post.desc}
              isPin={post.is_pin}
              key={post._id}
              postId={post._id}
              setPostId={setPostId}
              title={post.title}
              userId={post.user_id}
            />
          ))}
      </div>
    );
  }

  return (
    <div>
      <AddEditPost postId={postId} setPostId={setPostId} />
      {renderAllPosts()}
    </div>
  );
};

export default PostSection;
