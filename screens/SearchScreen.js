import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, SearchBar, Slider } from 'react-native-elements';
import { termChanged, columnsChanged, loadResult } from '../actions';

class SearchScreen extends Component {
	

	static navigationOptions = (props) => {
		const { navigate } = props.navigation;

		return {
				headerRight: (
						<Button 
							title="Result" 
							onPress={() => navigate('result')} 
							backgroundColor="rgba(0, 0, 0, 0)"
							color="rgba(0, 122, 255, 1)"
						/>
				)
			};
	}

	state = {
		sliderMinValue: 1,
		sliderMaxValue: 5,
		columns: 1
	}

	onTermChange = term => {
		this.props.termChanged(term);
	}

	onColumnsChange = columns => {
		this.props.columnsChange(columns);
	}

	onButtonPress = () => {
		this.props.loadResult(this.props.term, () => {
			this.props.navigation.navigate('result');
		});
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={styles.termContainer}>
					<Text style={styles.termText}>Term:</Text>
					<SearchBar
						round
						lightTheme
						onChangeText={term => this.props.termChanged(term)}
						placeholder='Type Here...' 
						containerStyle={styles.searchBarStyle}
					/>
				</View>
				<View style={styles.columnContainer}>
					<Text style={styles.columnText}>Columns</Text>
					<View style={{ width: 150, alignItems: 'stretch', justifyContent: 'center' }}>
						<Slider
							value={this.props.columns}
							onValueChange={columns => this.props.columnsChanged(columns)} 
							maximumValue={this.state.sliderMaxValue}
							minimumValue={this.state.sliderMinValue}
							step={1}
							style={{ marginLeft: 10, marginRight: 10 }}
						/>
					</View>
					<Text style={styles.columnText}>{this.props.columns}</Text>
				</View>
				<Button 
					large
					title="Search"
					onPress={this.onButtonPress}
					backgroundColor="transparent"
					color="rgb(255, 255, 255)"
					textStyle={{ fontSize: 24 }}
					icon={{ name: 'search' }}
				/>
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
		backgroundColor: '#009688',
		justifyContent: 'center',
		alignItems: 'center',
	},
	termContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	termText: {
		fontSize: 16,
		alignSelf: 'center',
		color: 'rgb(255, 255, 255)' 
	},
	searchBarStyle: {
		width: 200,
		backgroundColor: 'transparent',
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	columnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	columnText: { 
		fontSize: 16, 
		alignSelf: 'center',
		color: 'rgb(255, 255, 255)' 
	}
};

export default connect(mapStateToProps, { termChanged, columnsChanged, loadResult })(SearchScreen);
