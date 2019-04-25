import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default class BranchDetail extends Component {
	// set the navigation title
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("title", "Location Detail")
		};
	};

	render() {
		const { navigation } = this.props;
		const item = navigation.getParam("item", {
			brancType: null,
			branchAddress: "Arabian Automobiles, Nissan Service, Ajman, UAE",
			branchCode: "AJM",
			branchDesc: "Ajman",
			branchId: 23,
			branchPostBox: "P.O.Box:1201",
			branchXaxis: "55.463057309389114",
			branchYaxis: "25.373732832538607",
			brand: "NISSAN",
			department: "SERVICES"
		});

		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.mapView}
					region={{
						latitude: parseFloat(item.branchYaxis),
						longitude: parseFloat(item.branchXaxis),
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					{
						<Marker
							coordinate={{
								latitude: parseFloat(item.branchYaxis),
								longitude: parseFloat(item.branchXaxis)
							}}
							title={item.branchDesc}
							description={item.branchAddress}
						/>
					}
				</MapView>
				<View style={styles.detailView}>
					<Text style={styles.titleText}>{item.branchDesc}</Text>
					<Text style={styles.detailText}>
						<Text>{item.branchAddress}</Text>
						<Text>, {item.branchPostBox}</Text>
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E4E3EB"
	},
	mapView: {
		height: "40%"
	},
	detailView: {
		backgroundColor: "white",
		padding: 20,
		margin: 10,
		borderRadius: 5.0
	},
	titleText: {
		paddingBottom: 5,
		color: "#F58D2A",
		fontWeight: "bold",
		fontSize: 20
	},
	detailText: { paddingBottom: 0, color: "grey", fontSize: 16 }
});
