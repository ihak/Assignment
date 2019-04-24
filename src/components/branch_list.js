import React, { Component } from "react";
import { View, Text } from "react-native";

export default class BranchList extends Component {
	componentDidMount() {
		console.log("Component did mount");
		this.fetchBranchList();
	}

	render() {
		return (
			<View>
				<Text>Hello BranchList</Text>
			</View>
		);
	}

	fetchBranchList() {
		return fetch("https://customtst.awrostamani.ae/AWRMobileRestAPIProxy/resources/branchProxyService/getBranchListProxyeService", {
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
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				return responseJson;
			})
			.catch(error => {
				console.error(error);
			});
	}
}
