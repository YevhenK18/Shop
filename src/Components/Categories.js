import React, { Component } from 'react'

export class Categories extends Component {
  constructor(props){
    super(props)
    this.state = {
        categories:[
            {
                key:'All',
                name: 'All'
            },
            {
                key:'Warm',
                name: 'Warm'
            },
            {
                key:'Cold',
                name: 'Cold'
            }
        ]
    }

  }
  
    render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el =>(
            <div key={el.key} onClick={()=> this.props.chooseCategory(el.key)}>
                {el.name} 

            </div>
        ))}
      </div>
    )
  }
}

export default Categories