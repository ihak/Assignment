import React, { Component } from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";
import ListHeader from "./list_header";
import ListItem from "./list_item";
import { NearestCity } from "./closest_location.js";

export default class BranchList extends Component {
	// Set navigation title
	static navigationOptions = {
		title: "Our Locations"
	};

	constructor(props) {
		super(props);

		// Set initial state of the component
		this.state = {
			refresh: false,
			sections: [{ title: "Loading...", data: [] }],
			branchList: [],
			nearest: [],
			latitude: null,
			longitude: null,
			error: null
		};
	}

	componentDidMount() {
		console.log("Component did mount");

		// Fetch branch list from webservice
		this.fetchBranchList().then(branchList => {
			console.log(branchList);
			this.setState({ branchList }, () =>
				this.calculateNearestLocation()
			);
		});

		this.getCurrentLocation();
	}

	render() {
		return (
			<SectionList
				style={styles.container}
				extraData={this.state.refresh}
				renderItem={({ item, index, section }) => (
					<ListItem
						item={item}
						onPress={item =>
							this.props.navigation.navigate("BranchDetail", {
								item: item,
								title: item.branchDesc
							})
						}
					/>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<ListHeader title={title} />
				)}
				sections={this.state.sections}
				keyExtractor={(item, index) => item + index}
			/>
		);
	}

	// Fetch api call which returns a promise
	// with response json object
	fetchBranchList() {
		return fetch(
			"https://customtst.awrostamani.ae/AWRMobileRestAPIProxy/resources/branchProxyService/getBranchListProxyeService",
			{
				method: "PUT",
				headers: {
					auth: "AWR$CUSTOMER$MOBILEAPP",
					appName: "AWRCA2018",
					source: "AWR_CUSTOMER_APP",
					latitude: "",
					longitude: "",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					pIdentifier: "32371",
					pAttribute1: "",
					pAttribute2: "",
					pAttribute3: "",
					pAttribute4: "",
					pAttribute5: ""
				})
			}
		)
			.then(response => {
				// Check for the response else return empty object
				if (response.ok) {
					return response.json();
				} else {
					return {};
				}
			})
			.then(responseJson => {
				console.log(responseJson);
				if (
					responseJson.statusCode !== undefined &&
					responseJson.statusCode == 999
				) {
					return responseJson.branchList;
				} else {
					return [];
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	// Retrieves current location of the user
	getCurrentLocation() {
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log("Retrieved the current location");

				// Save the location in state and calculate
				// nearest location afterwards.
				this.setState(
					{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						error: null
					},
					() => this.calculateNearestLocation()
				);
			},
			error => {
				console.log("Error getting the location.");
				this.setState({ error: error.message });
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	calculateNearestLocation() {
		// If latitude is present calculate nearest location
		if (this.state.latitude !== null) {
			// create locations array from branchList array to find the
			// nearest branch
			let branchList = this.state.branchList;

			// If no branches present exit the function
			if (branchList.length <= 0) {
				return;
			}

			let locations = branchList.map(branch => [
				branch.branchDesc,
				branch.branchYaxis,
				branch.branchXaxis,
				branch
			]);

			let closestLocation = NearestCity(
				parseFloat(this.state.latitude),
				parseFloat(this.state.longitude),
				locations
			);

			console.log("Closest location: ", closestLocation);

			this.setState({
				sections: [
					{ title: "Nearby", data: [closestLocation[3]] },
					{ title: "Our other locations", data: branchList }
				]
			});
		} else {
			this.setState({
				sections: [{ title: "", data: this.state.branchList }]
			});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F6F6F6"
	}
});
