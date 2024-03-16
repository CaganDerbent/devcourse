import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { useAuthContext } from "../../components/hook/useAuthContext";
import { useState,useEffect } from "react";

const Tables = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>

      
    </Row>
  );
};

export default Tables;
