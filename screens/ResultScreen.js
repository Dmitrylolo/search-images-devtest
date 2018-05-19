import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;


class ResultScreen extends Component {
	

	state = {
		html: '<div>getting results</div>',
	}

	renderSearchResult = images => {
		const imgDimensions = SCREEN_WIDTH / this.props.columns;

		if (images.length === 0) {
			return <Text> No results :(</Text>;
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
			<ScrollView style={{ flex: 1 }} >
				<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
					{this.renderSearchResult(this.props.images)}
				</View>
			</ScrollView>
		);
	}
}


const mapStateToProps = ({ search }) => {
	const { columns, images } = search;

	return { columns, images };
};



const styles = {
	imgStyle: { 
		borderWidth: 1, 
		borderColor: '#FFFFFF'
	}
};

export default connect(mapStateToProps, {})(ResultScreen);
