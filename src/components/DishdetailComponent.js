import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Label,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm } from "react-redux-form";

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null)
    return (
      <div>
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

        <CommentForm dishId={dishId} />
      </div>
    );
  else return <div></div>;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            {/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}> */}
            <Form>
              <FormGroup row>
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Input type="select" name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                  {/* <Control.select
                    model=".rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select> */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Input
                    type="textarea"
                    id="comment"
                    name="comment"
                    rows="6"
                  ></Input>
                  {/* <Control.textarea
                    model=".comment"
                    id="comment"
                    rows="6"
                    className="form-control"
                  /> */}
                </Col>
              </FormGroup>
              <Button type="submit" className="bg-primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};
export default DishDetail;
