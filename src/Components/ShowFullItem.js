import React, { Component } from 'react';

export class ShowFullItem extends Component {
  render() {
    return (
      <div className='full-item'>
        <div>
  
          <img
            src={"./img/" + this.props.item.image}
            onClick={() => this.props.onShowItem(this.props.item)}
            alt={this.props.item.name}
          />
          
          
          <h2>{this.props.item.name}</h2>
          
          
          <p>{this.props.item.description}</p>
          
          <b>{this.props.item.price}$</b>
          
          
          <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>🛒</div>

          
          <button className='close-button' onClick={() => this.props.onShowItem(null)}>Close</button>
        </div>
      </div>
    );
  }
}

export default ShowFullItem;
