// ProjectForm.js

import React, { useState } from 'react';
import { Row, Col, Button, Input, Form, Upload, message } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../../API';
import { useDispatch } from 'react-redux';
import { addProject as addProjectAction } from '../../redux/projectReducer';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import { convertImageToBase64 } from '../../utils'; // Adjust the import path as per your project structure

const { Dragger } = Upload;

function ProjectForm() {
  const { accessToken } = useOidcAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoBase64Data, setLogoBase64Data] = useState(null);

  const beforeUpload = async (file) => {
    try {
      const base64Data = await convertImageToBase64(file);
      setLogoBase64Data(base64Data);
      return false; // Prevent Dragger from uploading the file
    } catch (error) {
      console.error('Error converting image to base64:', error);
      message.error('Failed to convert image to base64');
      return false; // Prevent Dragger from uploading the file
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (values) => {
    try {
      const { projectName, description } = values;

      const newProject = {
        name: projectName,
        description,
        logoBase64Data,
      };

      const addedProject = await addProject(newProject, accessToken);
      dispatch(addProjectAction(addedProject));

      message.success('Project added successfully');
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
      message.error('Failed to add project');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '20px' }}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Dragger
          name="file"
          multiple={false}
          beforeUpload={beforeUpload}
          showUploadList={false}
          style={{ marginBottom: '16px' }}
        >
          <div style={{ border: '1px dashed #ccc', padding: '16px', textAlign: 'center' }}>
            Click to select files or drag and drop here
          </div>
        </Dragger>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true, message: 'Please enter Project Name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter Description' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: '8px' }} icon={<ArrowLeftOutlined />}>
              Back to List
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProjectForm;
