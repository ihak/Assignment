import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class ListHeader extends Component {
	render() {
		let { title } = this.props;

		return (
			<View>
				<Text style={styles.title}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	title: { padding: 10, fontWeight: "bold", fontSize: 12, color: "grey" }
});
