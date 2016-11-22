import React from 'react';

import DatabaseHelper from '../databaseShortcuts.js';
require("./../resources/css/searchEvent.css");
class SearchEventListItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.createRequest = this.createRequest.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.checkIfRequested = this.checkIfRequested.bind(this);
	}

	getEventDiv() {
		if(typeof this.props.eventInfo === "undefined")
		{
			return (<li>
								<div>
								</div>
							</li>
			);
		}
		else {
			if (!this.checkIfRequested()) {
				return(
					<li className="eventSearchLoadingItem">
						<div className="eventSearchLoadingDiv hvr-back-pulse2">
							<p>{this.props.eventInfo.name}</p>
							<p>{this.formatTime()}</p>
							<span className="button-create btn btn-danger joinEventButton" onClick={this.createRequest}>Join</span>
						</div>
					</li>
				);
			} else {
				return(
					<li className="eventSearchLoadingItem">
						<div className="eventSearchLoadingDiv hvr-back-pulse2">
							<p>{this.props.eventInfo.name}</p>
							<p>{this.formatTime()}</p>
						</div>
					</li>
				);
			}
		}
	}

	render() {
		return (this.getEventDiv());
	}

	formatTime() {
		var t = this.props.eventInfo.startTime;
		if(~this.props.eventInfo.startTime.indexOf("T")) {
			var d1 = this.props.eventInfo.startTime.split("T");
			var d2 = d1[0].split("-")
			var formatedDate = d2[1]+'/'+d2[2]+'/'+d2[0]
			return " – " + formatedDate;
		} else {
			return ""
		}
	}

	checkIfRequested() {
		if(this.props.invites.length > 0) {
			for(var i = 0; i < this.props.invites.length; i++) {
				if(this.props.invites[i].eventId == this.props.eventInfo.id ) {
					return true
				}
			}
		}
		return false
	}

	createRequest() {

		var fromId = this.props.user.id;
		var toId = this.props.eventInfo.userId;
		var eventId = this.props.eventInfo.id;

		var query = "INSERT INTO Invites (fromId, toId, isRequest, eventId, isPending) VALUES ('";
		query +=  fromId + "', '";
		query += toId + "', '";
		query += "1" + "', '";
		query += eventId + "', '";
		query += "1'); ";

		DatabaseHelper(query).then((res) => {
			//console.log(res);
		});

	}

}

export default SearchEventListItem;