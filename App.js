import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

  selectFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, res => {
      console.log('Respone = ', res);
      if(res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error){
        console.log('ImagePicker Error: ', res.error);
        alert(res.customButton)
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };
  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64' + this.state.resourcePath.data,
            }}
            style={{ width: 100, heigh: 100 }}
          />
          <Image
            source={{ uri: this.state.resourcePath.data }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.resourcePath.uri}
          </Text>
          <TouchableOpacity onPress={this.selectFile} style={styles.button}>
            <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});
