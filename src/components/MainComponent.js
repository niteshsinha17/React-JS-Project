import React, { Component } from "react";
import Menu from "./MenuComponennts";
import Home from "./HomeComponent";
import "./Main.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Contact from "./Contact";
import DishDetail from "./Dishdetail";
import About from "./About";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  postComment,
  fetchLeader,
  feedback,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// json-server --watch db.json -p 3001 -d 2000
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchLeader: () => dispatch(fetchLeader()),
  feedback: (values) => dispatch(feedback(values)),
});
// firstname,
// lastname,
// contactno,
// email,
// agree,
// contactType,
// message
class Main extends Component {
  onDishSelect(dishId) {
    const dish = this.props.dishes.filter((dish) => dish.id === dishId)[0];
    this.setState({ selectedDish: dish });
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeader();
  }
  render() {
    const home_page = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      if (match != null) {
        return (
          <DishDetail
            dish={
              this.props.dishes.dishes.filter(
                (dish) => dish.id === parseInt(match.params.dishId, 10)
              )[0]
            }
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === parseInt(match.params.dishId, 10)
            )}
            postComment={this.props.postComment}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
          />
        );
      }
    };

    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={home_page} />
              <Route path="/menu/:dishId" component={DishWithId} />

              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    sendFeedback={this.props.feedback}
                    resetFeedbackForm={this.props.resetFeedbackForm}
                  />
                )}
              />
              <Route
                path="/about"
                component={() => <About leaders={this.props.leaders.leaders} />}
              />

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
