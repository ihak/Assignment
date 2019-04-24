import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ListHeader extends Component {
	render() {
		let { title } = this.props;

		return (
			<View>
				<Text>{title}</Text>
			</View>
		);
	}
}
