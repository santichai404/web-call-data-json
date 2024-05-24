import { useState } from "react";
import { Col, Row, Card, Button, Form, Input } from "antd";

import { CloseOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const CompenentCard = (props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(props.data);
  const [openInput, setOpenInput] = useState(false);

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
      <div
        style={{
          height: "calc(100vh - 350px)",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "15px",
        }}
      >
        <Row gutter={[16, 16]}>
          {dataSource.map((row, index) => (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} key={index}>
              <Card title={`${row.id}. ${row.title}`}>
                <div style={{ fontWeight: "600" }}>Content : </div> {row.body}
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    type="dashed"
                    danger
                    icon={<DeleteOutlined />}
                    style={{ marginTop: "20px" }}
                    onClick={() => {
                      onDelete(row);
                    }}
                  ></Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default CompenentCard;
