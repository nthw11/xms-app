import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };
  const onSubmitMovie = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  return {
    onChange,
    onSubmit,
    values,
    onSubmitMovie,
  };
};
