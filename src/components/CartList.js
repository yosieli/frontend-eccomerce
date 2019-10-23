import React from 'react'
import CartItems from './CartItems'
import { Button } from 'react-bootstrap'
import CheckOutForm from './CheckOutForm'


import Row from 'react-bootstrap/Row'


export default  class Cart  extends React.Component {
    state = {
        myItems: [],
        total:0,
        buyItems: false,
        chosenItem: {},
        boughtItem: false,
       
       
    }

    componentDidMount(){
        fetch(`http://localhost:3000/cartItems/${localStorage.getItem('user')}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(result=>this.setState({
            myItems:result
        })).then(this.buyItems)
    }

  
    buyItems = () => {
        let counter =0
        this.state.myItems.forEach(item=>counter += parseInt(item.price))
        this.setState({
            total:counter,
            
        })
    }


    removeItem = (item) => {
        fetch(`http://localhost:3000/cartItems/${localStorage.getItem('user')}/${item.item_id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
         let myItems = this.state.myItems.filter(items => {
                return items.id !== item.id
            })
         this.setState({
             myItems: myItems,
             total: this.state.total-(item.quantity * item.price)
         })
    }
   
    handleSubmit = (item) => {
        console.log(item)
        this.setState({
            buyItems: !this.state.buyItems,
            boughtItem: !this.state.boughtItem
        })
       
    }


    buySpecificItem = (item) => {
        fetch(`http://localhost:3000/cartItems/${localStorage.getItem('user')}/${item.item_id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        let myItems = this.state.myItems.filter(items => {
            return items.id !== item.id
        })
        this.setState({
            chosenItem: item,
            myItems: myItems,
            total: this.state.total-(item.quantity * item.price),
            buyItems: !this.state.buyItems
     })

    }

    clearCart = () => {
        fetch(`http://localhost:3000/cartItems/${localStorage.getItem('user')}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        this.setState({
            myItems:[],
            total:0
        })
       
    } 
    handleBoughtItem = () =>{
        alert('You just bought: '+ this.state.chosenItem.item_name) 
        this.setState({
            boughtItem: !this.state.boughtItem
        })
    }
    render(){
     let items = this.state.myItems
     let shown
     console.log(this.state.buyItems)
    
     if(this.state.buyItems){
        shown = (  <div className="app-container">
                        <div className="row">
                            <div className="col no-gutters">
                                <CheckOutForm  handleSubmit={this.handleSubmit} chosenItem = {this.state.chosenItem}/>
                            </div>
                        </div>
                    </div>
                )
    }
    else{
       
        shown = (<div style = {{paddingLeft: '6%', "background-color": "rgb(238,236,225)", height: '100vh'}}>
            <h3> My Cart items: ${this.state.total}</h3>
            <h3><Button onClick={() => this.clearCart()}  variant="outline-danger" >Empty Cart</Button> </h3> 
            
            <Row >
                {items.map(item => {
                    return(
                    <div>
                        
                    <CartItems  item = {item}    clearCart={this.clearCart}  removeItem={this.removeItem} buyItems={this.buySpecificItem} /> 
                    </div> 
                    )
                })}
            </Row>
                

         </div>)

    }
     return(
        <div>
            {shown}
            {this.state.boughtItem ? this.handleBoughtItem() : null }
        </div>
        )

    }


}