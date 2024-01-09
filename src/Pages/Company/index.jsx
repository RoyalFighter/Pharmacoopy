// Company.js
import React, { useState } from 'react';
import { Button, Input, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CompanyForm from '../../Components/CompanyForm';

const { Option } = Select;

function Company() {
  const [showForm, setShowForm] = useState(false);

  const handleAddCompanyClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (values) => {
    // Handle form submission (you can add your logic here)
    console.log('Submitted values:', values);

    // After handling submission, hide the form
    setShowForm(false);
  };

  const handleBackButtonClick = () => {
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Add Company</div>
         
          <Button type="primary" onClick={handleAddCompanyClick} style={{ marginTop: '16px' }}>
            Add Company
          </Button>
        </div>
      )}

      {showForm && <CompanyForm onSubmit={handleFormSubmit} onCancel={handleBackButtonClick} />}

      {!showForm && (
        <div style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Input
                placeholder="Search by company name"
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={8}>
              <Select placeholder="Select Status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select placeholder="Sort By">
                <Option value="AtoZ">A to Z</Option>
                <Option value="ZtoA">Z to A</Option>
                <Option value="recent">Recent</Option>
                <Option value="older">Older</Option>
              </Select>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Company;
