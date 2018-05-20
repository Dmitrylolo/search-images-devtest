import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import { Button, SearchBar, Slider } from 'react-native-elements';
import { termChanged, columnsChanged, loadResult } from '../actions';

class SearchScreen extends Component {
	static navigationOptions = (props) => {
		const { navigate } = props.navigation;

		return {
			headerStyle: {
				backgroundColor: 'transparent',
				borderWidth: 0,
				borderColor: 'transparent',
				borderBottomWidth: 0

			},
			headerRight: (
					<Button 
						title="Result" 
						onPress={() => navigate('result')} 
						backgroundColor="rgba(0, 0, 0, 0)"
						color="rgb(255, 20, 141)"
						fontSize={16}
					/>
			),
			headerTransparent: true
		};
	}

	state = {
		sliderMinValue: 1,
		sliderMaxValue: 5,
		errorStatus: false,
		launch: true,
		switcher: false,
		firstColor: '#FFFFFF',
		secondColor: '#000000'
	}

	componentWillMount() {
	}


	onTermChange = term => {
		if (this.state.errorStatus) {
			this.setState({ erorStatus: false });
		}
		this.props.termChanged(term);
	}

	onColumnsChange = columns => {
		this.props.columnsChange(columns);
	}

	onButtonPress = () => {
		if (this.props.term.length === 0) {
			this.setState({ errorStatus: true });
			return null;
		}
		this.props.loadResult(this.props.term, () => {
			this.props.navigation.navigate('result');
		});
	}

	onSwitcherValueChange = value => {
		this.setState({ switcher: value });
		if (value === true) {
			this.setState({ firstColor: '#000000', secondColor: '#FFFFFF' });
			console.log(this.state);
			return null;
		}
		this.setState({ firstColor: '#FFFFFF', secondColor: '#000000' });
		
	}

	renderError = () => {
		console.log(this.state);
		if (this.state.errorStatus) {
			return (
				<Text style={styles.errorStyle}>
					You forgot to type something in the field bottom. :)
				</Text>
			);
		}
	}


	render() {
		return (
			<View style={[styles.containerStyle, { backgroundColor: this.state.firstColor }]}>
				{this.renderError()}
				<View style={styles.termContainer}>
					<Text style={[styles.termText, { color: this.state.secondColor }]}>Term:</Text>
					<SearchBar
						round
						lightTheme
						onChangeText={term => this.props.termChanged(term)}
						placeholder={this.props.term.length === 0 ? 'Search for...' : this.props.term} 
						containerStyle={[styles.searchBarStyle]}
						inputStyle={
							[styles.searchBarInputContainerStyle,
							{ backgroundColor: this.state.secondColor, 
								color: this.state.firstColor, 
								borderColor: this.state.secondColor 
							}]}
						noIcon
					/>
				</View>
				<View style={styles.columnContainer}>
					<Text style={[styles.columnText, { color: this.state.secondColor }]}>Columns</Text>
					<View style={{ width: 150, alignItems: 'stretch', justifyContent: 'center' }}>
						<Slider
							value={this.props.columns}
							onValueChange={columns => this.props.columnsChanged(columns)} 
							maximumValue={this.state.sliderMaxValue}
							minimumValue={this.state.sliderMinValue}
							step={1}
							style={{ marginLeft: 20, marginRight: 20 }}
							maximumTrackTintColor="rgb(231, 255, 22)"
							minimumTrackTintColor="rgb(255, 20, 141)"
							thumbTouchSize={{ width: 200, height: 90 }}
							thumbTintColor={this.state.secondColor}
						/>
					</View>
					<Text style={[styles.columnText, { color: this.state.secondColor }]}>{this.props.columns}</Text>
				</View>
				<View style={[styles.searchButtonStyle, { borderColor: this.state.secondColor }]}>
					<Button 
						title="Search"
						onPress={this.onButtonPress}
						color={this.state.secondColor}
						textStyle={{ fontSize: 28 }}
						icon={{
							name: 'search',
							size: 50,
							color: this.state.secondColor
						}}
						loadingRight={false}
						transparent
					/>
				</View>
				<View style={styles.switchStyle}> 
					<Switch
						onValueChange={value => this.onSwitcherValueChange(value)}
						value={this.state.switcher}
						onTintColor={this.state.secondColor}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ search }) => {
	const { term, columns } = search;

	return { term, columns };
};

const styles = {
	containerStyle: {
		flex: 1,
		marginTop: -100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorStyle: {
		position: 'absolute',
		top: 200,
		alignSelf: 'stretch'
	},
	termContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	termText: {
		fontSize: 16,
		alignSelf: 'center' 
	},
	searchBarStyle: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
		width: 200,
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	searchBarInputContainerStyle: {
		fontSize: 16,
		height: 40,
		borderRadius: 12,
		borderWidth: 1,
		borderStyle: 'dashed',
		paddingLeft: 20,
	},
	columnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	columnText: { 
		fontSize: 16, 
		alignSelf: 'center', 
	},
	searchButtonStyle: {
		padding: 6,
		paddingLeft: 0,
		paddingRight: 12,
		borderRadius: 13,
		borderWidth: 2,
		borderStyle: 'dotted',
		margin: 12
	},
	switchStyle: {
		position: 'absolute',
		bottom: 60 
	}
};

export default connect(mapStateToProps, { termChanged, columnsChanged, loadResult })(SearchScreen);
