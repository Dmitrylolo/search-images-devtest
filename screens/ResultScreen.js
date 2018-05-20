import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { FontAwesome } from '@expo/vector-icons';


const SCREEN_WIDTH = Dimensions.get('window').width;
//const SCREEN_HEIGHT = Dimensions.get('window').height;


class ResultScreen extends Component {
	static navigationOptions = () => {
		return {
			headerLeft: null,
			header: null
		};
	}
	
	state = {
		
	}

	onBackButtonPress = () => {
		this.props.navigation.goBack();
	}

	renderSearchResult = images => {
		const imgDimensions = SCREEN_WIDTH / this.props.columns;
		if (images.length === 0) {
			return (
				<View style={styles.noResultContainer}>
					<Text style={styles.noResultsText}>{this.props.errorText}</Text>
				</View>
				);
		} 
			return images.map((image) => {
				return (
					<Image 
						key={image.id}
						indicator={Progress.Circle}
						indicatorProps={{
							anumated: true,
							color: 'rgba(255, 20, 141, 1)',
							unfilledColor: 'rgba(255, 20, 141, 0)'
						}}
						threshold={10}
						source={{ uri: image.src }} 
						style={[
							styles.imgStyle, 
							{
								width: imgDimensions,
								height: imgDimensions,
							}
						]} 
					/>
				);
		});
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<TouchableOpacity
					onPress={this.onBackButtonPress}
					style={styles.backButtonStyle}
				>
					<FontAwesome 
						name='caret-left'
						size={24}
						color='rgba(255, 20, 141, 1)'
					/>
				</TouchableOpacity>
				<View style={{ justifyContent: 'center', alignItems: 'flex-end' }} >
					<ScrollView style={styles.headerContainer} horizontal>
						<Text style={styles.headerText}>
							{this.props.term}:
						</Text>
					</ScrollView>
				</View>
				<ScrollView style={{ flex: 1 }} >
					
					<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
						{this.renderSearchResult(this.props.images)}
					</View>
				</ScrollView>
			</View>
		);
	}
}


const mapStateToProps = ({ search }) => {
	const { columns, images, errorText, term } = search;

	return { columns, images, errorText, term };
};

const styles = {
	headerContainer: {
		height: 40, 
		marginTop: 22,
	},
	headerText: { 
		flex: 1, 
		fontSize: 23, 
		paddingTop: 5, 
		paddingRight: 10, 
		fontWeight: '300',
		letterSpacing: 3
	},
	imgStyle: { 
		borderWidth: 1, 
		borderColor: '#FFFFFF'
	},
	backButtonStyle: {
		flex: 1, 
		zIndex: 2,
		position: 'absolute',
		top: 28,
		left: 14, 
		height: 30, 
		width: 30, 
		backgroundColor: 'rgba(255, 255, 255, 0)',
		borderRadius: 40,
		borderWidth: 1, 
		borderColor: 'rgba(255, 20, 141, 1)', 
		alignItems: 'center',
		justifyContent: 'center' 
	},
	noResultContainer: {
		marginTop: 250,
		width: SCREEN_WIDTH
	},
	noResultsText: {
		color: '#000000',
		fontSize: 27,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',

	}
};

export default connect(mapStateToProps, {})(ResultScreen);
