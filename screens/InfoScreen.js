import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Linking,
	ActivityIndicator,
	Image,
	Dimensions,
	WebView,
	TouchableOpacity
} from 'react-native';
import { Appbar, List, Button, Card, Title, Paragraph, Divider, Checkbox } from 'react-native-paper';
import HTML from 'react-native-render-html';

export default class InfoScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('name', 'A Nested Details Screen'),
			headerStyle: {
				backgroundColor: '#f4511e'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		};
	};

	state = {
		product: [],
		company: [],
		expanded: true,
		loaded: false
	};

	componentDidMount() {
		this.loadproduct();
	}
	loadproduct() {
		var { navigation } = this.props;
		var id = navigation.getParam('id', 'NO-ID');
		var name = navigation.getParam('name', 'some default value');
		fetch(`https://aslbazar.com/api/v1/getproduct?id=${id}`).then((res) => res.json()).then((json) => {
			this.setState({
				product: json.product[0],
				company: json.product[0].company[0],
				loaded: true
			});
		});
	}
	_handlePress = () =>
		this.setState({
			expanded: !this.state.expanded
		});

	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'NO-ID');
		const id = navigation.getParam('id', 'NO-ID');
		const { product, company, loaded } = this.state;
		return (
			<View>
				<ScrollView>
					{loaded ? (
						<View>
							<View style={styles.card}>
								<Text style={{ fontSize: 22, color: '#2b5eaf' }}>{product.name}</Text>
								<Image
									style={{ height: 200, width: '90%', marginLeft: '5%', marginVertical: 50 }}
									source={{ uri: product.image_url }}
								/>
								<Text style={{ color: '#e26826', fontSize: 15 }}>{product.price}</Text>
							</View>
							<View style={styles.card}>
								<View style={{ borderBottomWidth: '3', color: 'gray' }}>
									<Text style={{ fontSize: 22, color: '#2b5eaf' }}>Mahsulot haqida</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>
										Mahsulot turi:
									</Text>
									<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
										{product.category[0].name}
									</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>Brend:</Text>
									<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
										{product.brand}
									</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>
										Ishlab chiqaruvchi:
									</Text>
									<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
										{product.made_in_id}
									</Text>
								</View>
							</View>
							<View style={styles.card}>
								<View style={{ borderBottomWidth: '3', color: 'gray' }}>
									<Text style={{ fontSize: 22, color: '#2b5eaf' }}>Batafsil ma'lumot</Text>
								</View>
								<ScrollView style={{ flex: 1 }}>
									<HTML
										html={product.description_uz}
										imagesMaxWidth={Dimensions.get('window').width}
									/>
								</ScrollView>
							</View>
							<View style={styles.card}>
								<View style={{ borderBottomWidth: '3', color: 'gray' }}>
									<Text style={{ fontSize: 22, color: '#2b5eaf' }}>Kompaniya bilan bog'lanish</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>
										Asosiy Telefon:
									</Text>
									<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
										{product.company[0].telephone}
									</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontSize: 15, color: 'gray', paddingVertical: 7 }}>
										Mobil telefon:
									</Text>
									<Text style={{ paddingVertical: 7, fontSize: 15, paddingRight: 10 }}>
										{product.company[0].mobile_phone}
									</Text>
								</View>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate('CompanyProfile', {
											company: product.company[0]
										});
									}}
								>
									<View
										style={{
											height: 60,
											width: '100%',
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: '#f4511e',
											borderRadius: 5
										}}
									>
										<Text style={{ fontSize: 21, textAlign: 'center', color: '#fff' }}>
											Kompaniya Profili
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					) : (
						<ActivityIndicator style={{ marginTop: 250 }} color="orange" size="large" />
					)}
				</ScrollView>
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
