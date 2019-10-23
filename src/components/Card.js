import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class Cards extends React.Component{
    state = {
        front: true
    }
    render () {
        return(
           <div>
            <Col xs={4}>
                <Card style={{ width: '18rem','border-radius': '7px', margin: '10px'}}>
                    <Card.Img variant="top" src={this.props.item.image_url} style = {{height: '250px'}}/>
                    <Card.Body >
                        <Card.Title>{this.props.item.item_name}</Card.Title>
                        <Card.Text>
                            {"Price: $" + this.props.item.price}
                        </Card.Text>
                        <Button onClick = {() => this.props.handleShow(this.props.item)} variant="outline-primary" style = {{marginBottom: '5px' }}>View Description</Button>
                        <Button onClick = {() => this.props.addToCart(this.props.item)} variant="outline-primary" style = {{marginBottom: '5px' }}>Add to Cart</Button>
                        <br></br>
                        <Button onClick = {() => this.props.remove(this.props.item)} variant="outline-danger">Remove</Button>
                    </Card.Body>
                </Card>
            </Col>
           
            </div>
        )
    }  
}
export {Cards}