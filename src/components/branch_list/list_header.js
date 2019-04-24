import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class ListHeader extends Component {
	render() {
		let { title } = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { backgroundColor: "#F6F6F6" },
	title: { padding: 10, fontWeight: "bold", fontSize: 12, color: "grey" }
});
