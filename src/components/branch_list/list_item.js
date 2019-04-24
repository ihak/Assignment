import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ListItem extends Component {
	render() {
		let { item } = this.props;

		return (
			<View>
				<Text>{item.branchDesc}</Text>
			</View>
		);
	}
}
