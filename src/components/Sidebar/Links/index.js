import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Links extends Component{

	render(props){
		return(
			<nav>
				<NavLink to= {{
					pathname: `/${this.props.widgetUrl}`, 
					query: {}, 
					activeClassName:"active", 
					// state:{},
				}}>
					<button onClick={()=> this.props.setItemL2(this.props.index)}>
						<h2 className="sidebar-h2">{this.props.widgetName}</h2>
					</button>
				</NavLink>
			</nav>
		)
	};
};

export default Links;