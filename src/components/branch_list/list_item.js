import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class ListItem extends Component {
	render() {
		let { item, onPress } = this.props;

		return (
			<TouchableOpacity onPress={() => onPress(item)}>
				<View style={styles.container}>
					<Text style={styles.text}>{item.branchDesc}</Text>
					<View style={styles.separator} />
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: { backgroundColor: "white" },
	text: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 16
	},
	separator: {
		marginLeft: 20.0,
		marginRight: 10.0,
		backgroundColor: "lightgrey",
		height: 0.5
	}
});
