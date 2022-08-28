import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, HashRouter} from "react-router-dom";
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';

import Sidebar from '../Sidebar';
import Widget from '../Widget';
import Details from '../Details';
import Placeholder from './Placeholder';

//function to alphabetize widgets by name
function nameSort(a, b) {
	var widgA = a.widgetName.toUpperCase();
	var widgB = b.widgetName.toUpperCase();
			        
	var comparison = 0;
	if (widgA > widgB) {
		comparison = 1;
	} else if (widgA < widgB) {
		comparison = -1;
	}
	return comparison;
}

class HomePage extends Component {

	constructor(props){
	    super(props);

    	// this.ref = this.props.firebase.database().ref('widgets');

	    this.state = {
	      data: [],
	      currentWidget: [],
	      currentFlavours:[],
	      currentHelpers: [],
	      currentDetails: []
	    }

   		this.setItemByIndex = this.setItemByIndex.bind(this)
   		this.setDetailsByIndex = this.setDetailsByIndex.bind(this)
	}
	
	componentDidMount() {
		this.props.firebase.database().on('value', snapshot => {
			
		    var dbContent = snapshot.val();
		    console.log(dbContent);
		    
		    //alphabetize items by widget name
	        if (dbContent){
	        	dbContent.sort(nameSort);
	        }

		    //create urls for all widgets/helpers/flavours
		    dbContent.forEach(function(item, i){
	   	     	var str = item.widgetName;
				str = str.replace(/\s+/g, '-').toLowerCase();
				item.url = "widgets/" + str; 

				item.helpers.forEach(function(helper, ind){
					var strH = helper.name;
					strH = strH.toLowerCase().replace(/[: ]+/g, "-");
					// strH = strH.toLowerCase().replace(/[^a-z0-9]/g, '-');
					helper.url = "helpers/" + str + "/" + strH; 
				})

				item.flavours.forEach(function(flavour, index){
					var strF = flavour.name;
					strF = strF.toLowerCase().replace(/[: ]+/g, "-");
					flavour.url = "flavours/" + str + "/" + strF; 
				})
	   	    })
	   	    this.setState({
		    	data : dbContent,
		    	currentHelpers: dbContent[0].helpers,
	    	    currentFlavours: dbContent[0].flavours
		    });
		})
		
	}
	componentDidUpdate() {
		// console.log("THIS IS STATE", this.state)
	}
	
	setItemByIndex(itemIndex){
		let currentState = this.state.data;

		this.setState({
			currentindex: itemIndex,
		   	currentWidget: currentState[itemIndex],
		   	currentHelpers: currentState[itemIndex].helpers,
	        currentFlavours: currentState[itemIndex].flavours,
		});
	}

	setDetailsByIndex(detailInd, detailType){
		let statePath = "";

		switch(detailType) {
		  case "flavour":
		    statePath = this.state.currentFlavours
		    break;
		  case "helper":
		    statePath = this.state.currentHelpers
		    break;
		  default:
		    break;
		}
		this.setState({
			currentDetails: statePath[detailInd]
		});
	}

	render () {
		return (
	   		<Router>
		      	<div className="sidebar col-lg-3 col-md-4 col-sm-12">
		      		<Sidebar setItemL1={this.setItemByIndex} allData={this.state.data} />
		    	</div>
				<div className = "main-content col-lg-9 col-md-8 col-sm-12">
					<Switch>
						<Route path="/widgets/"  component={() => <Widget setDetailL1={this.setDetailsByIndex} allData={this.state.data} widgetHelpers={this.state.currentHelpers} widgetFlavours={this.state.currentFlavours}/>} />
						<Route path={["/flavours/", "/helpers/"]} component={() => <Details detailData={this.state.currentDetails}/>} />
						<Route exact path="/" component={Placeholder} />
					</Switch>
				</div>
			</Router>
						
		);
	};
}


//is authenticated?
const condition = authUser => !!authUser;

//below is export with a single hoc, replaced with multiple hoc using recompose
// export default withAuthorization(condition)(HomePage);

export default compose(
	withEmailVerification,
	withFirebase,
	withAuthorization(condition),
)(HomePage);