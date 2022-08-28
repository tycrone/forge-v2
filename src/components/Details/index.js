import React, {Component} from 'react';

class Details extends Component{

	render(props){
		console.log(this.props)
		return(
			<div>
				<h2 className ="details-h2-1">{this.props.detailData.name}</h2>
				<p className="details-p-1">{this.props.detailData.shortDesc}</p>
				{this.props.detailData.description.map((desc, i) => (
					<React.Fragment>
						<img src={desc.image} />
						<p className="details-p-1">{desc.snippet}</p>	
					</React.Fragment>
			
			    ))}
			</div>
		)
	}

}


export default Details;