import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ListItem extends Component {
	render() {
		let { item, onPress } = this.props;

		return (
			<TouchableOpacity onPress={() => onPress(item)}>
				<View style={styles.container}>
					<View style={styles.content}>
						<Text style={styles.text}>{item.branchDesc}</Text>
						<View style={styles.iconContainer}>
							<Icon
								name="chevron-right"
								size={15}
								style={styles.icon}
							/>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: { backgroundColor: "white", padding: 0 },
	content: {flexDirection: "row", justifyContent: "flex-start" },
	text: {
		flex: 1,
		padding: 20,
		fontWeight: "bold",
		fontSize: 16
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		color: "#d6d7da",
		padding: 15
	},
	separator: {
		marginLeft: 20.0,
		marginRight: 10.0,
		backgroundColor: "lightgrey",
		height: 0.5
	}
});
