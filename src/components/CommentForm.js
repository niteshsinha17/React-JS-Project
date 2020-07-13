import React, { Component } from "react";
import { Button } from "reactstrap";

class CommentForm extends Component {
  render() {
    return (
      <div>
        <Button outline onClick={() => this.props.onclick()}>
          <span className="fas fa-pen"></span>
          Submit Comment
        </Button>
      </div>
    );
  }
}

export default CommentForm;
