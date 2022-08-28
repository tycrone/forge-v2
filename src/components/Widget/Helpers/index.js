import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

class Helpers extends Component{


	render(props){
		return(
			<Card>
			    <Card.Img variant="top" src={this.props.helperThumb} />
			    <Card.Body>
			      <Card.Title>{this.props.helperName}</Card.Title>
			      <Card.Text>{this.props.helperShortDesc}</Card.Text>
			    </Card.Body>
			    <Card.Footer>
			      <small className="text-muted">
			      {this.props.helperTags.map((tag) => (
						tag + ",  "
			      	))}
			      </small>
			    </Card.Footer>
			</Card>
		)
	}

}


export default Helpers;