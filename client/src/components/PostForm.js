import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

// const genericPoster = () => <Image src='../../public/img/genposter.png' />;

function PostForm(props) {
  const { values, onChange, onSubmitMovie } = useForm(createPostCallback, {
    title: '',
    body: '',
    rating: '',
    // tags: '',
    posterImg: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.title = '';
      values.body = '';
      values.rating = '';
      // values.tags = '';
      values.posterImg = '';
      values.posterImg = '';
    },

    onError(err) {
      console.log(err + 'PostForm ln 33');
    },
  });

  function createPostCallback() {
    createPost();
    console.log('post createdd');
  }

  return (
    <>
      <Form onSubmitMovie={this.onSubmitMovie.bind(this)}>
        <h2>Enter a film:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Title'
            name='title'
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.Input
            placeholder='Description'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Form.Input
            placeholder='Rating'
            name='rating'
            onChange={onChange}
            value={values.rating}
            error={error ? true : false}
          />
          {/* <Form.Input
            placeholder='Tags'
            name='tags'
            onChange={onChange}
            value={values.tags}
            error={error ? true : false}
          /> */}
          <Form.Input
            placeholder='poster url (optional)'
            name='posterImg'
            onChange={onChange}
            value={values.posterImg}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {/* {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )} */}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $rating: String!
    # $tags: String!
    $posterImg: String!
  ) {
    createPost(
      title: $title
      body: $body
      rating: $rating
      # tags: $tags
      posterImg: $posterImg
    ) {
      id
      title
      body
      rating
      # tags
      posterImg
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
