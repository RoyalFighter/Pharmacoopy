import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Space, Menu, Dropdown, Switch } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import { getProjects } from '../../API';
import { setProjects } from '../../redux/projectReducer';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectForm from '../../Components/ProjectForm';

const { Search } = Input;
const { Option } = Select;

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useOidcAccessToken();
  const [searchTerm, setSearchTerm] = useState('');
  const [logos, setLogos] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2, // Set your default page size here
  });

  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects(accessToken, pagination);
        setLoading(false);
        setLogos(data.map((project) => ({ id: project.id, logoBase64Data: project.logoBase64Data })));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, dispatch, pagination]);

  const handleTableChange = async (pagination) => {
    try {
      setPagination(pagination);
      // Update URL with pagination information
      history(`/projects?page=${pagination.current}`);
  
      const data = await getProjects(accessToken, pagination);
      setLoading(false);
      setLogos(data.map((project) => ({ id: project.id, logoBase64Data: project.logoBase64Data })));
    } catch (error) {
      console.error('Error handling table change:', error);
      setLoading(false);
    }
  };
  
  

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: 'S.No', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    { title: 'Logo', dataIndex: 'id', key: 'logo', render: (text, record) => (
      <img
        src={`data:image/png;base64,${logos.find((logo) => logo.id === record.id)?.logoBase64Data}`}
        alt={`Logo for ${record.name}`}
        style={{ width: 30, height: 30, borderRadius: 20 }}
      />
    )},
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => {
            // Handle status change here if needed
            console.log(checked);
          }}
        />
      ),
    },
    { title: 'Created By', dataIndex: 'creatorFullName', key: 'creatorFullName' },
    {
      title: 'Created At',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <EllipsisOutlined style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="assign">Assign Project</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
      {/* Add more actions as needed */}
    </Menu>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Projects</h2>
        <Button type="primary">
          <Link to="/projects/add">Add Project</Link>
        </Button>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <Search
          placeholder="Search Project Name"
          style={{ width: 250, marginRight: '10px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select defaultValue="Select Status" style={{ width: 120, marginRight: '10px' }}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
        <Select defaultValue="Sort By" style={{ width: 150, marginRight: '10px' }}>
          <Option value="NameAsc">Name Ascending</Option>
          <Option value="NameDesc">Name Descending</Option>
          <Option value="Recent">Recent</Option>
          <Option value="Older">Older</Option>
        </Select>
        <Button>Clear</Button>
      </div>
      <Routes>
        <Route path="add" element={<ProjectForm />} />
        <Route
          path="/"
          element={
            <Table
            dataSource={filteredProjects}
            columns={columns}
            loading={loading}
            pagination={{
              ...pagination,
              total: projects.length * pagination.pageSize, // Update the total value
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['2', '3', '5'], // customize the page size options
            }}
            onChange={handleTableChange}
            style={{ marginTop: '10px' }}
          />
          
          }
        />
      </Routes>
    </div>
  );
};

export default Projects;
