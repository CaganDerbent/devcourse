import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Badge
} from "reactstrap";
import { useState,useEffect } from "react";
import { useAuthContext } from "../hook/useAuthContext";

const Blog = (props) => {

  return (
    <Card>

<CardImg alt="Card image cap" src={props.image} />
<CardBody className="p-4">
  <CardTitle tag="h5">{props.title}</CardTitle>
  <CardSubtitle>{props.subtitle}</CardSubtitle>
  
  <Badge color="primary">{props.category}</Badge>
  <CardText className="mt-3" ><strong>{props.price} TL</strong></CardText>
  <Button color={props.color} onClick={props.onClick}>{props.textb}</Button>
</CardBody>
      
    </Card>
  );
};

export default Blog;
