import React, { Component } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

export class Order extends Component {
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.image} alt={this.props.item.name} />
        <h2>{this.props.item.name}</h2>
        <b>{this.props.item.price}$ x {this.props.item.quantity}</b>
        <FaRegTrashAlt className='delete-icon' onClick={() => this.props.onDelete(this.props.item.index)} /> {/* Изменено с this.props.item.id на this.props.item.index */}
      </div>
    )
  }
}

export default Order;
