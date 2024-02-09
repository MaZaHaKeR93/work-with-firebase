import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {ApiPost} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import {format} from 'date-fns';

interface Props {

}
const Post: React.FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState<ApiPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiPost | null>('/posts/' + params.id + '.json');
    setPost(response.data);
    setIsLoading(false);
  }, [params.id])

  useEffect(() => {
    void fetchPost();
  }, [fetchPost])

  const deletePost = () => {
    void axiosApi.delete<null>('/posts/' + params.id + '.json');
    navigate('/');
  };

  let postArea = (<Spinner />)

  if (!isLoading && post) {
    postArea = (
      <div>
        <span className="text-muted"
              style={{fontSize: "10px"}}>Created on: {format(post.createdAt, 'dd.MM.yyyy HH:mm')}
        </span>
        <h1>{post.title}</h1>
        <article>{post.description}</article>
        <div>
          <button className="btn btn-danger" onClick={deletePost}>Delete</button>
          <Link to={'/posts/' + params.id + '/edit'} className="btn btn-success">Edit</Link>
        </div>
      </div>
    )
  } else if (!isLoading && !post) {
    postArea = (<h1>Not found</h1>)
  }

  return postArea;
};

export default Post;