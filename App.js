import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Linking } from 'react-native';
import {
	createDrawerNavigator,
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	DrawerItems,
	createMaterialTopTabNavigator
} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChildrenScreen from './screens/ChildrenScreen';
import ProductsScreen from './screens/ProductsScreen';
import InfoScreen from './screens/InfoScreen';
import SearchScreen from './screens/SearchScreen';
import FeatureScreen from './screens/FeatureScreen';
import AboutScreen from './screens/AboutScreen';
import ConnectScreen from './screens/ConnectScreen';
import Icon from '@expo/vector-icons/Ionicons';
import GetCategory from './screens/GetCategory';
import { List } from 'react-native-paper';

class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Hello</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

class CDrawerComponent extends React.Component {
	state = {
		categories: []
	};

	componentDidMount() {
		fetch(`https://aslbazar.com/api/v1/getnestedcategories`).then((res) => res.json()).then((json) => {
			this.setState({
				categories: json
			});
			console.log(json);
		});
	}
	render() {
		return (
			<ScrollView>
				<View
					style={{
						height: 150,
						backgroundColor: 'white',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 50
					}}
				>
					<Image
						style={{ width: 150, height: 60 }}
						source={{ uri: 'https://aslbazar.com/themes/yellow/img/logo.png' }}
					/>
				</View>
				<List.Item
					title="Yangiliklar"
					onPress={() => {
						Linking.openURL('https://aslbazar.com/news/').catch((err) =>
							console.error('An error occurred', err)
						);
					}}
				/>
				<List.Item
					title="Biz haqimizda"
					onPress={() => {
						Linking.openURL('https://aslbazar.com/site/about/').catch((err) =>
							console.error('An error occurred', err)
						);
					}}
				/>
			</ScrollView>
		);
	}
}

const TabNav = createMaterialTopTabNavigator(
	{
		Feature: {
			screen: FeatureScreen
		},
		Home: {
			screen: HomeScreen
		}
	},
	{
		navigationOptions: ({ navigation }) => {
			const { routeName } = navigation.state.routes[navigation.state.index];
			return {
				headerTitle: 'Aslbazar.com',
				headerStyle: { backgroundColor: '#f4511e' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' },
				headerLeft: (
					<Icon
						onPress={() => navigation.openDrawer()}
						style={{ paddingLeft: 20, color: '#fff' }}
						name="md-menu"
						size={30}
					/>
				)
			};
		},
		tabBarOptions: {
			style: {
				backgroundColor: '#f4511e'
			}
		}
	}
);

const CompanyProfileTab = createMaterialTopTabNavigator(
	{
		About: {
			screen: AboutScreen
		},
		Connect: {
			screen: ConnectScreen
		}
	},
	{
		navigationOptions: ({ navigation }) => {
			const { routeName } = navigation.state.routes[navigation.state.index];
			let company = navigation.getParam('company', 'A Nested Details Screen');
			return {
				headerTitle: company.company_name,
				headerStyle: { backgroundColor: '#f4511e' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			};
		},
		tabBarOptions: {
			style: {
				backgroundColor: '#f4511e'
			}
		}
	}
);

const StackNav = createStackNavigator({
	TabNav: {
		screen: TabNav
	},
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => {
			return {
				headerTitle: 'Home',
				headerLeft: (
					<Icon
						onPress={() => navigation.openDrawer()}
						style={{ paddingLeft: 20 }}
						name="md-menu"
						size={30}
					/>
				)
			};
		}
	},
	Children: {
		screen: ChildrenScreen
	},
	Products: {
		screen: ProductsScreen
	},
	Settings: {
		screen: SettingsScreen
	},
	Info: {
		screen: InfoScreen
	},
	CompanyProfile: {
		screen: CompanyProfileTab
	}
});

const MainStack = createStackNavigator(
	{
		Tab: {
			screen: TabNav,
			navigationOptions: {
				header: { visible: true }
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return {
				header: { visible: false },
				headerLeft: (
					<Icon
						onPress={() => navigation.openDrawer()}
						style={{ paddingLeft: 20 }}
						name="md-menu"
						size={30}
					/>
				)
			};
		}
	}
);

const DrawerNav = createDrawerNavigator(
	{
		StackNav: {
			screen: StackNav
		}
	},
	{
		contentComponent: CDrawerComponent,
		contentOptions: {
			activeTintColor: 'orange'
		}
	}
);

export default createAppContainer(DrawerNav);
