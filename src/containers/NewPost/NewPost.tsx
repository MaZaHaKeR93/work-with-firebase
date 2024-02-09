import {useNavigate, useParams} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from 'react';
import {ApiCreatedPost, ApiPost} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const NewPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ApiPost>({
    title: '',
    description: '',
    createdAt: '',
  })

  const fetchData = useCallback(async () => {
    if (!params.id) {
      setFormData({title: '', description: '', createdAt: ''});
      return
    }

    setIsLoading(true);
    const response = await axiosApi.get<ApiPost | null>('/posts/' + params.id + '.json');
    const post = response.data

    if (post) {
      setFormData(prevState => ({
        ...prevState,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      }))
    } else {
      setFormData({
        title: '',
        description: '',
        createdAt: ''
      });
    }
    setIsLoading(false);
  }, [params.id])

  useEffect(() => { void fetchData(); }, [fetchData])

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
      title: formData.title,
      description: formData.description,
      createdAt: formData.createdAt.length !== 0 ? formData.createdAt : (new Date()).toISOString(),
    }

    if (params.id) {
      const response = await axiosApi.put<ApiPost | null>('/posts/' + params.id + '.json', requestBody);
      if (response.data) {navigate('/posts/' + params.id);}
    } else {
      const response = await axiosApi.post<ApiCreatedPost | null>('/posts.json', requestBody);
      if (response.data) {navigate('/posts/' + response.data.name)}
    }
  }

  let pageContent = (<Spinner />);

  if (!isLoading) {
    pageContent = (
      <form onSubmit={onFormSubmit}>
        <h4>{params.id ? 'Add new post' : 'Edit post'}</h4>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={formData.title}
            onChange={changeFormData}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            value={formData.description}
            onChange={changeFormData}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">{params.id ? 'Update' : 'Create'}</button>
      </form>
    )
  }

  return pageContent;
};

export default NewPost;