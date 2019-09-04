import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class AboutScreen extends React.Component {
	static navigationOptions = {
		title: 'Biz haqimizda',
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
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Biznes turi:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
							{products.businessTypeList}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Joylashgan joyi:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>{products.city}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Asosiy mahsulotlar:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
							{products.main_products_uz}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Asosiy bozorlar:</Text>
						<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
							{products.main_markets_uz}
						</Text>
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
