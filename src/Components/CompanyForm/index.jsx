// CompanyForm.js
import React from 'react';
import { Row, Col, Button, Input, Select, Form, Upload, message } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Dragger } = Upload;

function CompanyForm({ onSubmit, onCancel }) {
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '20px' }}>
      <Form onFinish={onSubmit} layout="vertical">
        <Dragger
          name="file"
          multiple={false}
          beforeUpload={beforeUpload}
          showUploadList={false}
          style={{ marginBottom: '16px' }}
        >
          <div style={{ border: '1px dashed #ccc', padding: '16px', textAlign: 'center' }}>
            Click to select picture
          </div>
        </Dragger>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Company Name" name="companyName" required>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Description" name="description" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email" required>
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Phone Number" name="phoneNumber" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Location" name="location" required>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Website" name="website" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add
            </Button>
            <Button onClick={onCancel} style={{ marginLeft: '8px' }} icon={<ArrowLeftOutlined />}>
              Back
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CompanyForm;
