import React from "react";
import {Cards} from './Card.js'
import Row from "react-bootstrap/Row";


import ItemSpec from './ItemSpec.js'


class Favorites extends React.Component {
    state = {
        myFavorites: [],
        showingAllItems: true,
        chosenItem: {},
        browse: false
    }
    componentDidMount() {
        fetch(`http://localhost:3000/favoriteItems/${localStorage.getItem('user')}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                myFavorites: data
            })
        })
    }
    handleShow = (item) => {
        this.setState({
            showingAllItems: !this.state.showingAllItems,
            chosenItem: item
        })
    }

    addToCart = (item) => {
  
        fetch(`http://localhost:3000/addToCart/${localStorage.getItem('user')}/${item.item_id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                
                user_id: localStorage.getItem('user'),
                item_id: item.id,
                quantity: 1,
                item_name: item.item_name,
                price: item.price,
                image_url: item.image_url
            })
        })
        let myItems = this.state.myFavorites.filter(items => {
            return items.id !== item.id
        })
        this.setState({
            myFavorites: myItems,
        })
    }

    remove = (item) => {
        fetch(`http://localhost:3000/favoriteItems/${localStorage.getItem('user')}/${item.item_id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        let myItems = this.state.myFavorites.filter(items => {
            return items.id !== item.id
        })
        this.setState({
            myFavorites: myItems,
        })
    }


    render(){
        return(
           
            

            <Row style = {{paddingLeft: '6%', marginRight: '0px', "background-color": "rgb(238,236,225)", height: '100vh'}}>
                
                {this.state.showingAllItems ? this.state.myFavorites.map( (item) =><Cards item = {item} addToCart = {this.addToCart} remove = {this.remove} handleShow = {this.handleShow}/>) : <ItemSpec chosenItem = {this.state.chosenItem} handleShow = {this.handleShow} addToCart = {this.addToCart} browse = {this.state.browse}/>}  

            </Row>
           
        )
    }
}
export {Favorites}

