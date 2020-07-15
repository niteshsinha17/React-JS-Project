import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
// import { baseUrl } from "../shared/baseUrl";

const Menu = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  } else {
    let dishes = props.dishes.map((dish) => {
      return (
        <div key={dish.id} className=" card">
          <li className="menu-item">
            <img
              src={dish.image}
              alt="imageHere"
              className="menu-item-img"
            ></img>
            <div>
              <Link to={`menu/${dish.id}`}>
                <h2 className="menu-item-name">{dish.name}</h2>
              </Link>

              <p className="menu-item-dis">{dish.description}</p>
            </div>
          </li>
        </div>
      );
    });
    return dishes;
  }
};

const menu = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
        <div className="row">
          <Menu
            dishes={props.dishes.dishes}
            errMess={props.dishes.errMess}
            isLoading={props.dishes.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default menu;
