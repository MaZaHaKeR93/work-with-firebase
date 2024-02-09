import React from 'react';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';
import {Post} from '../../../types';

interface Props {
  post: Post;
}
const PostItem: React.FC<Props> = ({post}) => {
  return (
    <div key={post.id} className="card">
      <div className="card-body">
        <span className="text-muted" style={{fontSize: "10px"}}>Created on: {format(post.createdAt, 'dd.MM.yyyy HH:mm')}</span>
        <h6>{post.title}</h6>
        <Link to={'/posts/' + post.id} className="btn btn-primary">Read more &gt;&gt;</Link>
      </div>
    </div>
  );
};

export default PostItem;