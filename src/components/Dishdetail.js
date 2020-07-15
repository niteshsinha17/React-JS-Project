import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Loading } from "./LoadingComponent";
// import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class RenderDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit = (values) => {
    this.props.postComment(
      this.props.dish.id,
      values.rating,
      values.author,
      values.comment
    );
  };
  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null) {
      return (
        <div className="container">
          <Modal
            isOpen={this.state.isModalOpen}
            toggle={this.state.toggleModal}
          >
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md="10">
                    <Control.select
                      model=".rating"
                      name="rating"
                      id="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={12}>
                    Your Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 character",
                        maxLength: "Must be 15 character or less",
                      }}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>
                    Comment
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>

          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-5 m-1">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <div className="card">
                  <img
                    src={this.props.dish.image}
                    className="detail-dish-img"
                    alt="somrthing"
                  ></img>
                  <div>
                    <h2 className="menu-item-name">{this.props.dish.name}</h2>
                    <p className="menu-item-dis">
                      {this.props.dish.description}
                    </p>
                  </div>
                </div>
              </FadeTransform>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 m-1">
              <div className="row">
                <RenderComment
                  errMess={this.props.commentErrMess}
                  comments={this.props.comments}
                />
              </div>
              <div className="row">
                <Stagger in>
                  <CommentForm onclick={this.toggleModal} />
                </Stagger>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const RenderComment = (props) => {
  if (props.errMess) {
    return (
      <div className="row">
        <h3>{props.errMess}</h3>
      </div>
    );
  } else if (props.comments != null) {
    let commentList = props.comments.map((com) => {
      return (
        <Fade className="comment" in>
          <div key={com.id}>
            <p>{com.comment}</p>
            <p>
              --{com.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(com.date)))}
            </p>
          </div>
        </Fade>
      );
    });
    return commentList;
  }
};
const DishDetail = (props) => {
  return (
    <div>
      <div className="container">
        <RenderDish
          dish={props.dish}
          isLoading={props.isLoading}
          errMess={props.errMess}
          commentErrMess={props.commentErrMess}
          comments={props.comments}
          postComment={props.postComment}
        />
      </div>
    </div>
  );
};
export default DishDetail;
