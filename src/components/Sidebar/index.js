import React, {Component} from 'react';
import Links from './Links';

class Sidebar extends Component{

	constructor(props){
		super(props);
		this.state = {
			testContent: '',
		};
		this.updateWidgetFlavours = this.updateWidgetFlavours.bind(this)
	}
	
	updateWidgetFlavours(id){
		this.setState({
			testContent: id
		})
		this.props.updateContent(this.state.testContent);
	}

	render(props){
		return(
			<div className="sidebar-inner">
				<h3 className="sidebar-title">Widgets</h3>
				{this.props.allData.map((widget, i) => (
					<Links key = {i} index = {i} setItemL2 = {this.props.setItemL1} widgetUrl = {widget.url} widgetName={widget.widgetName}/>
				))}
			</div>
		)
	};
};

export default Sidebar;