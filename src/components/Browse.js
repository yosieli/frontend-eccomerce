import React from "react";
import {BrowseCards} from './BrowseCards.js'
import ItemSpec from './ItemSpec.js'
import Row from "react-bootstrap/Row";


class Browse extends React.Component {
    state = {
        allItems: [],
        showingAllItems: true,
        chosenItem: {},
        current_user: {},
        browse: true
    }
    componentDidMount() {
        fetch('http://localhost:3000/allItems', {
            method: "GET",
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                allItems: data
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
        console.log(item)
        fetch(`http://localhost:3000/addToCart/${localStorage.getItem('user')}/${item.id}`,{
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
    }

    addToFavorite = (item) => {
        fetch(`http://localhost:3000/addToFavorites/${localStorage.getItem('user')}/${item.id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user'),
                item_id: item.id,
                item_name: item.item_name,
                description: item.description,
                price: item.price,
                image_url: item.image_url
            })
        })
    }
    render(){
        return(
                    <Row style = {{paddingLeft: '6%', marginRight: '0px', "background-color": "rgb(238,236,225)"}}>
                        {this.state.showingAllItems ? this.state.allItems.map( (item, index) =><BrowseCards item = {item} handleShow = {this.handleShow} addToCart = {this.addToCart} addToFavorite = {this.addToFavorite}/>) : <ItemSpec browse = {this.state.browse} chosenItem = {this.state.chosenItem} handleShow = {this.handleShow} addToCart = {this.addToCart} addToFavorite = {this.addToFavorite}/>}
                    </Row>
           
        )
    }
}
export {Browse}
