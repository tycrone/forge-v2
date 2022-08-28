import React, {Component} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CardDeck from 'react-bootstrap/CardDeck'

import Helpers from './Helpers';
import Flavours from './Flavours';


class Widget extends Component{


	render(props){
		return(
			<div>
				<Tabs defaultActiveKey="helpers" id="uncontrolled-tab-example">
					<Tab eventKey="helpers" title="Helpers">
						<div className="contentCont">
							<CardDeck>
								{this.props.widgetHelpers.map((helper, i) =>(
									<Helpers key = {i} helperUrl = {helper.url} helperName={helper.name} helperShortDesc = {helper.shortDesc} helperUrl = {helper.url} helperTags = {helper.tags} helperThumb = {helper.thumb}/>
								))}
							</CardDeck>
						</div>
					</Tab>
					<Tab eventKey="flavours" title="Flavours">
						<div className="contentCont">
							<CardDeck>
								{this.props.widgetFlavours.map((flavour, i) => (
								 	<Flavours setDetailL2 = {this.props.setDetailL1} detailIndex = {i} key = {i} flavourUrl = {flavour.url} flavourName={flavour.name} flavourShortDesc = {flavour.shortDesc} flavourUrl = {flavour.url} flavourTags = {flavour.tags} flavourThumb = {flavour.thumb}/>
								))}
							</CardDeck>
						</div>
					</Tab>
				</Tabs>
			</div>
		)
	}
}

export default Widget;



	
