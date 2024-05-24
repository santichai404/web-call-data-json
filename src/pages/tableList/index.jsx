import { useState } from "react";
import { Col, Row, Table, Modal, Button, Form, Input } from "antd";
import {
  InfoCircleOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ComponentTable = (props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(props.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState("");

  const [openInput, setOpenInput] = useState(false);
  const showModal = (data) => {
    setDataModal(data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataModal("");
  };
  const onFinish = async (values) => {
    let Total = dataSource.length;
    let payload = {
      id: Total + 1,
      userId: values.userId ? values.userId : 0,
      title: values.title ? values.title : "",
      body: values.body ? values.body : "",
    };
    setDataSource((p) => [...p, payload]);
    form.resetFields();
  };

  const onDelete = (data) => {
    setDataSource(dataSource.filter((item) => item.id != data.id));
  };

  const columns = [
    {
      title: "NO.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "CONTENT",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "DETAIL",

      render: (record) => (
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                showModal(record);
              }}
            >
              {" "}
              More
            </Button>
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(record);
              }}
            ></Button>
          </div>
        </>
      ),
    },
  ];

  const onOpenInput = () => {
    setOpenInput(true);
  };

  const onCloseInput = () => {
    setOpenInput(false);
    form.resetFields();
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontWeight: "600", fontSize: "20px" }}>
          {" "}
          Total : {dataSource?.length}
        </div>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={onOpenInput}
          disabled={openInput}
        >
          {" "}
          Add
        </Button>
      </div>
      {openInput ? (
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="User ID"
                name="userId"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Content"
                name="body"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input.TextArea showCount maxLength={100} size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div
                style={{ display: "flex", justifyContent: "end", gap: "20px" }}
              >
                <Button icon={<CloseOutlined />} onClick={onCloseInput}>
                  {" "}
                  Close
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginBottom: "20px" }}
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      ) : null}

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
      />
      <Modal
        title="More Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontWeight: "600" }}>Title </div>{" "}
          <div>{dataModal.title}</div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontWeight: "600" }}>Content </div>{" "}
          <div>{dataModal.body}</div>
        </div>
      </Modal>
    </>
  );
};

export default ComponentTable;
