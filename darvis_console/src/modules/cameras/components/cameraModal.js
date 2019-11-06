import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connectCamera } from '../../site/service';

const CameraModal = ({ camera, levelId, levels, addCamera, updateCamera, dismiss }) => {
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState(false);

  const cameraType = ['perspective', 'fisheye'];

  const [formData, setFormData] = useState({
    levelId: '',
    levels: [],
    name: '',
    type: 'perspective',
    url: '',
    user: '',
    password: ''
  });
  useEffect(() => {
    setFormData({
      name: camera ? camera.name : '',
      type: camera ? camera.type : 'perspective',
      url: camera ? camera.url : '',
      user: camera ? camera.username : '',
      password: camera ? camera.password : '',
      levelId: levelId ? levelId : '',
      levels: levels
    })
  },[camera, levelId, levels]);

  const handleSubmit = async (event, values) => {
    const callback = () => {
      setIsSaving(false);
    };
    const errCallback = () => {
      setIsSaving(false);
      setError(true);
    };
    setIsSaving(true);

    if (!camera) {
      const cam = { 
        url: 'rtsp://' + values.username + ':' + values.password + '@' + values.url,
        username: values.username,
        password: values.password
      }
      const image = await connectCamera(cam);
      if (image !== 'error' && image.length > 100) {
        cam.image = image;
        cam.name = values.name;
        cam.type = values.type;
        cam.url = values.url;
        addCamera(values.levelId, cam, callback, errCallback);
      } else {
        setIsSaving(false);
        setError(true);
        event.preventDefault();
      }
    } else {
      const cam = camera;
      cam.name = values.name;
      cam.type = values.type;
      if (formData.username !== values.username || formData.password !== values.password || formData.url !== values.url) {
        // case for the user & password changed
        const image = await connectCamera({
            url: 'rtsp://' + values.username + ':' + values.password + '@' + values.url, 
            username: values.username, 
            password: values.password });
        
        if (image !== 'error' && image.length > 100) {
          cam.username = values.username;
          cam.password = values.password;
          cam.image = image;
        } else {
          setIsSaving(false);
          setError(true);
          event.preventDefault();
          return;
        }
      }
      updateCamera(values.levelId, cam, callback, errCallback);
    }
  };

  return (
    <AvForm onValidSubmit={handleSubmit}>
      <ModalHeader>{camera ? 'Edit ' : 'Add '}Camera</ModalHeader>
      <ModalBody className="p-l-30 p-r-30">
        <Row>
          <Col md={6}>
            <AvField
              type="text"
              name="name"
              label="Name"
              value={formData.name}
              validate={{
                required: { value: true, errorMessage: 'Please enter a valid name' },
                minLength: { value: 3, errorMessage: 'Your name must be between 3 and 30 characters' },
                maxLength: { value: 30, errorMessage: 'Your name must be between 3 and 30 characters' },
              }}
            />
          </Col>
          <Col md={6}>
            <AvField
              type="select"
              name="type"
              label="Type"
              value={formData.type ? formData.type : 'perspective'}
              required
            >
              {cameraType.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </AvField>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AvField
              type='select'
              name='levelId'
              label='Level'
              value={formData.levelId}
              required
              disabled={camera}
            >
              <option value=''>None</option>
              {formData.levels && formData.levels.length > 0 && formData.levels.map(item => (
                <option key={item.levelId} value={item.levelId}>
                  {item.name}
                </option>
              ))}
            </AvField>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AvField
              type="text"
              name="url"
              label="Camera URL with port and stream name"
              value={formData.url}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AvField type="text" name="username" label="User" value={formData.user} required />
          </Col>
          <Col md={6}>
            <AvField type="password" name="password" label="Password" value={formData.password} required />
          </Col>
        </Row>

        {error && (
          <Row>
            <Col md={12}>
              <div style={{ color: '#f00' }}>Cannot connect to the camera</div>
            </Col>
          </Row>
        )}
      </ModalBody>
      <ModalFooter style={{ backgroundColor: '#e5e5e5' }}>
        {isSaving ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Button type="submit" className="green-button">
              {camera ? 'Save' : 'Connect camera'}
            </Button>
            <Button type="type" className="green-button" onClick={dismiss}>
              Cancel
            </Button>
          </React.Fragment>
        )}
      </ModalFooter>
    </AvForm>
  );
};

CameraModal.defaultProps = {
  //initalValues: {},
};

export default CameraModal;
