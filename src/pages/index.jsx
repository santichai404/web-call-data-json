import { Card, Col, Row, Tabs } from "antd";

import ComponentTable from "./tableList";
import CompenentCard from "./cardList";
import DataJSON from "../services/DataJSON.json";
const Pages = () => {
  const items = [
    {
      key: "1",
      label: "แสดงเป็นตารางข้อมูล",
      children: <ComponentTable data={DataJSON} />,
    },
    {
      key: "2",
      label: "แสดงเป็นรายการข้อมูล",
      children: <CompenentCard data={DataJSON} />,
    },
  ];
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card title={"ข้อมูล"}>
              <Tabs defaultActiveKey="1" items={items} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pages;
