import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/marvels";

const Admin = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFilm, setEditFilm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      message.error("Bu səhifəyə girmək icazəniz yoxdur!");
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
      message.error("Filmlər yüklənmədi!");
    }
    setLoading(false);
  };

  const deleteFilm = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Film silindi!");
      fetchFilms();
    } catch (error) {
      message.error("Film silinmədi!");
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
      message.success("Film redaktə olundu!");
      setIsModalOpen(false);
      fetchFilms();
    } catch (error) {
      message.error("Film redaktə edilmədi!");
    }
  };

  const columns = [
    { title: "Ad", dataIndex: "title", key: "title" },
    { title: "Tarix", dataIndex: "date", key: "date" },
    {
      title: "Əməliyyatlar",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>
            Redaktə et
          </Button>
          <Button onClick={() => deleteFilm(record._id)} danger>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <Table columns={columns} dataSource={films} rowKey="_id" loading={loading} />
      
      <Modal
        title="Filmi Redaktə Et"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form initialValues={editFilm} onFinish={handleEditSubmit}>
          <Form.Item name="title" label="Başlıq" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Tarix" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Yadda Saxla</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
