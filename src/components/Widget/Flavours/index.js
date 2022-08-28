import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import {NavLink} from "react-router-dom";

class Flavours extends Component{


	render(props){
		return(
			<Card>
			    <Card.Img variant="top" src={this.props.flavourThumb} />
			    <Card.Body>
			      <Card.Title>{this.props.flavourName}</Card.Title>
			      <Card.Text>{this.props.flavourShortDesc}</Card.Text>
			      <nav>
					<NavLink to= {{
						pathname: `/${this.props.flavourUrl}`, 
						query: {}, 
						activeClassName:"active", 
						// state:{}, 
					}}>
						<button onClick={()=> this.props.setDetailL2(this.props.detailIndex, 'flavour')}>
							<h2 className="sidebar-h2">SEE MORE</h2>
						</button>
					</NavLink>
				</nav>
			    </Card.Body>
			    <Card.Footer>
			      <small className="text-muted">
			      {this.props.flavourTags.map((tag) => (
						tag + ",  "
			      	))}
			      </small>
			    </Card.Footer>
			</Card>
		)
	}

}


export default Flavours;