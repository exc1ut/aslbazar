import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

export default class ConnectScreen extends React.Component {
	static navigationOptions = {
		title: "Kompaniya bilan bog'lanish",
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		}
	};

	state = {
		products: [],
		loaded: false
	};

	componentDidMount() {
		this.loadproducts();
	}
	loadproducts() {
		var { navigation } = this.props;
		var id = navigation.getParam('id', 'NO-ID');
		var company = navigation.getParam('company', 'some default value');
		var sub = [];
		fetch(`https://aslbazar.com/api/v1/getcompany?code=${company.code}`).then((res) => res.json()).then((json) => {
			this.setState({
				products: json.company[0],
				loaded: true
			});
		});
	}

	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'NO-ID');
		const company = navigation.getParam('company', 'company');
		const { products } = this.state;
		return (
			<View>
				{console.log(products)}
				<View style={styles.card}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Main phone:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>{company.telephone}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Mobil phone:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
							{company.mobile_phone}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Website:</Text>
						<Text
							onPress={() => Linking.openURL(products.url)}
							style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10, color: 'blue' }}
						>
							{products.url}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Address:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>{products.about_uz}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Country:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>{products.country}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>City/Region:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>{products.city}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		padding: 10,
		margin: 2,
		borderRadius: 5,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		overflow: 'hidden'
	}
});
