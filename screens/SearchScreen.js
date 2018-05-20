import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch, TextInput } from 'react-native';
import { Button, Slider } from 'react-native-elements';
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
			headerTransparent: true,
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
		console.log(this.state.errorStatus);
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

	onSubmit = () => {
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
		
		if (this.state.errorStatus) {
			return (
				<Text style={[styles.errorStyle, { color: this.state.secondColor }]}>
					You forgot to type something in the field bottom. :)
				</Text>
			);
		}
	}


	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
			{this.renderError()}
				<View style={[styles.containerStyle, { backgroundColor: this.state.firstColor }]}>	
					<View style={styles.termContainer}>
						<Text style={[styles.termText, { color: this.state.secondColor }]}>Term:</Text>
						<View style={styles.searchBarStyle}>
							<TextInput
								onChangeText={term => this.props.termChanged(term)}
								placeholder={'Search for...'} 
								style={
									[styles.searchBarInputContainerStyle,
									{ backgroundColor: this.state.secondColor, 
										color: this.state.firstColor, 
										borderColor: this.state.firstColor 
									}]
								}
								value={this.props.term}
								onSubmitEditing={this.onSubmit}
								clearButtonMode="always"
							/>
						</View>
					</View>
					<View style={styles.columnContainer}>
						<Text style={[styles.columnText, { color: this.state.secondColor }]}>Columns</Text>
						<View style={{ width: 150, alignItems: 'stretch', justifyContent: 'center', margin: 10 }}>
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
							onPress={this.onSubmit}
							color={this.state.secondColor}
							textStyle={{ fontSize: 28 }}
							icon={{
								name: 'search',
								size: 50,
								color: this.state.secondColor
							}}
							loading={this.props.loading}
							transparent
						/>
					</View>
					<View style={styles.switchStyle}> 
						<Switch
							onValueChange={value => this.onSwitcherValueChange(value)}
							value={this.state.switcher}
							onTintColor='rgba(50, 50, 50, 0.8)'
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ search }) => {
	const { term, columns, loading } = search;

	return { term, columns, loading };
};

const styles = {
	containerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	errorStyle: {
		position: 'absolute',
		top: 300,
		alignSelf: 'stretch',
		fontSize: 36
	},
	termContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	termText: {
		fontSize: 20,
		alignSelf: 'center',
		paddingRight: 8,
		fontWeight: '300'
	},
	searchBarStyle: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
		width: 200,
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	searchBarInputContainerStyle: {
		fontSize: 18,
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
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: '300' 
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
