import {useCallback, useEffect, useState} from 'react';
import {ApiPosts, Post} from '../../types';
import AxiosApi from '../../axiosApi';
import PostItem from './PostItem/PostItem';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await AxiosApi.get<ApiPosts | null>('/posts.json')
    const posts = response.data

    if (posts) {
      setPosts(Object.keys(posts).map(id => ({
        ...posts[id],
          id
      })))
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="mt-3 d-flex flex-column gap-3">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;