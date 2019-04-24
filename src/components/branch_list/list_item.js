import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class ListItem extends Component {
	render() {
		let { item, onPress } = this.props;

		return (
			<TouchableOpacity onPress={() => onPress(item)}>
				<View>
					<Text>{item.branchDesc}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
