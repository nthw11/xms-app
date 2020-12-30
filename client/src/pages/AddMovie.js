import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

import { Grid } from 'semantic-ui-react';
import PostForm from '../components/PostForm';

function AddMovie() {
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={1}>
      <Grid.Row className='page-title'>
        <h1>Add A New Movie</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
}
export default AddMovie;
