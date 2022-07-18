import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { COMMENTS } from "../shared/comments";

function RenderDish(dish) {
  return (
    <Card className="col-12 col-md-5 m-1">
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments(comments) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <div>
            {comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <li>
                    <p>{comment.comment}</p>
                    <p>
                      -- {comment.author},{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          {RenderDish(props.dish)}
          {RenderComments(
            COMMENTS.filter((comment) => comment.dishId == props.dish.id)
          )}
        </div>
      </div>
    );
  else return <div></div>;
};
export default DishDetail;
