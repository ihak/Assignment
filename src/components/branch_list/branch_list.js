import React, { Component } from "react";
import { View, Text, SectionList } from "react-native";
import ListHeader from "./list_header";
import ListItem from "./list_item";

export default class BranchList extends Component {
	constructor(props) {
		super(props);

		this.state = { branchList: [] };
	}

	componentDidMount() {
		console.log("Component did mount");
		this.fetchBranchList().then(branchList => {
			this.setState({ branchList: branchList });
		});
	}

	render() {
		return (
			<SectionList
				renderItem={({ item, index, section }) => (
					<ListItem item={item} />
				)}
				renderSectionHeader={({ section: { title } }) => (
					<ListHeader title={title} />
				)}
				sections={[
					{
						title: "Title1",
						data: this.state.branchList
					},
					{
						title: "Title2",
						data: [{ title: "item3" }, { title: "item4" }]
					},
					{
						title: "Title3",
						data: [{ title: "item5" }, { title: "item6" }]
					}
				]}
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
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);

				return responseJson.branchList;
			})
			.catch(error => {
				console.error(error);
			});
	}
}
