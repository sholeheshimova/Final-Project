import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { PieChartOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "../Admin/index.module.scss";

const BASE_URL = "http://localhost:8080/marvels";

const Admin = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFilm, setEditFilm] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      message.error("You are not allowed to enter this page!");
      navigate("/");
      return;
    }
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilms(response.data);
    } catch (error) {
      message.error("Failed to download movies!");
    }
    setLoading(false);
  };

  const deleteFilm = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Film is deleted!");
      fetchFilms();
    } catch (error) {
      message.error("Film  is not deleted");
    }
  };

  const openEditModal = (film) => {
    setEditFilm(film);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/${editFilm._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Film is edited!");
      setIsModalOpen(false);
      fetchFilms();
    } catch (error) {
      message.error("Film is not edit!");
    }
  };

  const addFilm = async (values) => {
    console.log(values);

    try {
      const token = localStorage.getItem("token");
      console.log("Göndərilən Token:", token);
      const response = await axios.post(BASE_URL, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      message.success("Film is added!");
      setIsAddModalOpen(false);
      fetchFilms();
    } catch (error) {
      message.error("Film is not add!");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={() => openEditModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button onClick={() => deleteFilm(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const data = films.map((film) => ({
    name: film.title,
    views: Math.floor(Math.random() * 1000) + 1,
  }));

  const COLORS = ["#ff0000", "#ff7300", "#ffbf00", "#ffd700", "#ff69b4"];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Films
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.content}>
          <h2>Admin Dashboard</h2>
          <Button
            type="primary"
            onClick={() => setIsAddModalOpen(true)}
            style={{ marginBottom: 16 }}
          >
            Add a new film!
          </Button>
          <div className={styles.wrapper}>
            <div className={styles.chart}>
              <PieChart width={400} height={300}>
                <Pie
                  data={data}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="views"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className={styles.legend}>
              {data.map((entry, index) => (
                <div
                  key={index}
                  style={{ color: COLORS[index % COLORS.length] }}
                >
                  ◼ {entry.name}
                </div>
              ))}
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={films}
            rowKey="_id"
            loading={loading}
          />
        </div>

        <Modal
          title="Edit Film"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form initialValues={editFilm} onFinish={handleEditSubmit}>
            <Form.Item name="title" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Remember it!
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Add a new film"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={null}
        >
          <Form onFinish={addFilm}>
            <Form.Item name="title" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
