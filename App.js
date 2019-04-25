/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import BranchList from "./src/components/branch_list/branch_list";
import BranchDetail from "./src/components/branch_detail";

const AppNavigator = createStackNavigator({
  BranchList: BranchList,
  BranchDetail: BranchDetail
});

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
