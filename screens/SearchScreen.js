import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch, TextInput, Dimensions } from 'react-native';
import { Button, Slider } from 'react-native-elements';
import { termChanged, columnsChanged, loadResult, switcherChanged } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
						title="Previous result" 
						onPress={() => navigate('result')} 
						backgroundColor="rgba(0, 0, 0, 0)"
						color="rgb(255, 20, 141)"
						fontSize={18}
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
		firstColor: '#FFFFFF',
		secondColor: '#000000'
	}

	componentWillMount() {
		if (this.props.switcher === true) {
			this.setState({ firstColor: '#000000', secondColor: '#FFFFFF' });
			console.log(this.state);
			return null;
		}
		this.setState({ firstColor: '#FFFFFF', secondColor: '#000000' });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.switcher === true) {
			this.setState({ firstColor: '#000000', secondColor: '#FFFFFF' });
			return null;
		}
		this.setState({ firstColor: '#FFFFFF', secondColor: '#000000'  });
	}


	onTermChange = term => {
		if (this.state.errorStatus) {
			this.setState({ errorStatus: false });
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
		this.props.switcherChanged(value);
	}

	renderError = () => {
		if (this.state.errorStatus) {
			return (
					<View style={{ position: 'absolute', top: 100, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={ { color: 'red', fontSize: 18 }}>
							Type something below. :)
						</Text>
					</View>
			);
		}
	}


	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<View style={[styles.containerStyle, { backgroundColor: this.state.firstColor }]}>
				{this.renderError()}	
					<View style={styles.termContainer}>
						<Text style={[styles.termText, { color: this.state.secondColor }]}>Term:</Text>
						<View style={styles.searchBarStyle}>
							<TextInput
								onChangeText={term => this.onTermChange(term)}
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
								clearButtonMode="while-editing"
								textUnderlineAndroid="transparent"
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
							value={this.props.switcher}
							onTintColor='rgba(50, 50, 50, 0.8)'
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ search }) => {
	const { term, columns, loading, switcher } = search;

	return { term, columns, loading, switcher };
};

const styles = {
	containerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	errorStyle: {
		width: SCREEN_WIDTH,
		position: 'absolute',
		top: 70,
		alignSelf: 'center', 
		fontSize: 16
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

export default connect(mapStateToProps, { termChanged, columnsChanged, loadResult, switcherChanged })(SearchScreen);
