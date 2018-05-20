import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
//const SCREEN_HEIGHT = Dimensions.get('window').height;


class ResultScreen extends Component {
	static navigationOptions = () => {
		return {
			headerStyle: {
				backgroundColor: '#FFFFFF',
				borderWidth: 0,
				borderColor: 'transparent',
				borderBottomWidth: 0

			}
		};
	}
	
	state = {
		html: '<div>getting results</div>',
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
			<ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF', marginTop: 8 }} >
				<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
					{this.renderSearchResult(this.props.images)}
				</View>
			</ScrollView>
		);
	}
}


const mapStateToProps = ({ search }) => {
	const { columns, images, errorText } = search;

	return { columns, images, errorText };
};

const styles = {
	imgStyle: { 
		borderWidth: 1, 
		borderColor: '#FFFFFF'
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
		justifyContent: 'center'
	}
};

export default connect(mapStateToProps, {})(ResultScreen);
