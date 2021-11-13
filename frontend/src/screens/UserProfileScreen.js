import React, { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Form, Button, Row, Image, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateProfile } from '../actions/userActions';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import AlertMessage from '../components/AlertMessage';
import { EDIT_PROFILE_RESET } from '../actions/constants';

const UserProfileScreen = ({ history }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userState);
  const { success, loading, error } = useSelector(
    (state) => state.editUserState
  );

  const imageUploadHandler = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        const res = await axios.post(
          '/api/users/upload/avatar',
          formData,
          config
        );
        setImage(res.data.image);
        setUploading(false);
      } catch (error) {
        setUploading(false);
        setErrorMsg(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ image, email, username, password, newPassword }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo?.username) {
      dispatch(getUser());
    } else {
      setEmail(userInfo?.email);
      setUserName(userInfo?.username);
      setImage(userInfo?.image);
    }
    if (success) {
      history.push('/');
      dispatch({ type: EDIT_PROFILE_RESET });
      dispatch(getUser());
    }
  }, [dispatch, success, userInfo, history, error]);
  return (
    <FormContainer>
      <h2 className="my-3 text-center">
        <i className="fas fa-profile"></i> Update Profile
      </h2>
      {error && <AlertMessage>{error}</AlertMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            minLength={8}
            value={password}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Enter Old Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter New Password"
          />
        </Form.Group>
        <Form.Group controlId="formGridState">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" defaultValue="User" disabled>
            <option>User</option>
            <option>Admin</option>
          </Form.Control>
        </Form.Group>
        <Row className="my-2">
          <Col md={4}>
            {uploading ? (
              <Loader />
            ) : (
              <Image fluid roundedCircle src={image} alt="avatar" />
            )}
          </Col>
          <Col md={8}>
            <Form.Group controlId="image">
              <label for="formFile" class="form-label">
                Avatar
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={imageUploadHandler}
              />
            </Form.Group>
            {errorMsg && <AlertMessage>{errorMsg}</AlertMessage>}
          </Col>
        </Row>
        <Row className="my-3 ">
          {loading ? (
            <LoadingButton> Updating...</LoadingButton>
          ) : (
            <Button className="p-2" variant="success" type="submit">
              Update
            </Button>
          )}
        </Row>
      </Form>
    </FormContainer>
  );
};

export default UserProfileScreen;
