import React, { Component } from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";
import ListHeader from "./list_header";
import ListItem from "./list_item";
import { NearestCity } from "./closest_location.js";

export default class BranchList extends Component {
	static navigationOptions = {
		title: "Our Locations"
	};

	constructor(props) {
		super(props);

		this.state = {
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
		this.fetchBranchList().then(branchList => {
			console.log(branchList);

			// If no branches present exit the function
			if (branchList.length <= 0) {
				return;
			}

			// create locations array from branchList array to find the nearest branch
			let locations = branchList.map(branch => [
				branch.branchDesc,
				branch.branchYaxis,
				branch.branchXaxis,
				branch
			]);

			let closestLocation = NearestCity(
				25.2539561,
				55.3325269,
				locations
			);

			console.log("Closest location: ", closestLocation);

			this.setState({
				sections: [
					{ title: "Nearby", data: [closestLocation[3]] },
					{ title: "Our other locations", data: branchList }
				]
			});
		});

		this.getCurrentLocation();
	}

	render() {
		return (
			<SectionList
				style={styles.container}
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

	getCurrentLocation() {
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log("Retrieved the current location");
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null
				});
			},
			error => {
				console.log("Error getting the location.");
				this.setState({ error: error.message });
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F6F6F6"
	}
});
