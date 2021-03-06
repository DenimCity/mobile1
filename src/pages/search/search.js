import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  StyleSheet,
  Image,
  Easing,
  FlatList,
  TouchableHighlight,
  Modal,
} from 'react-native';
import { Button, Icon, List, ListItem  } from 'react-native-elements';
import { DrawerNavigator, NavigationActions, StackNavigator } from 'react-navigation';
import { API, Storage } from 'aws-amplify';
// import AddPet from './AddPet';
// import ViewPet from './ViewPet';
// import UploadPhoto from '../Components/UploadPhoto';
// import SideMenuIcon from '../Components/SideMenuIcon';
import awsmobile from '../../aws-exports';
import { colors } from 'theme';

let styles = {};

class search extends React.Component {
  static navigationOptions = {
    title: 'Resources Available',
  }

    state = {
    selectedImage: {},
    selectedImageIndex: null,
    images: [],
    Resources: [],
    selectedGenderIndex: null,
    modalVisible: false,
    input: {
      name: '',
      product: '',
      address: '',
      offering: '',
      category: '',
      city: '',
      description: '',
      number: '',
      state: '',
      zip: '',
    },
    showActivityIndicator: false,
  }

   componentDidMount() {
    this.loadResources();
  }

    loadResources = () => {
        console.log("hey")
     return  API.get('Resource', '/resource')
      .then(res =>
        this.setState({ Resources: res })
        //console.log(res)
      )
      .catch(err => console.log(err));
  };

    updateInput = (key, value) => {
    this.setState((state) => ({
      input: {
        ...state.input,
        [key]: value,
      }
    }))
  }
 render() {
  
    return (
      <View style={{ flex: 1, paddingBottom: 0 }}>
      <ScrollView  style={{ flex: 1 }}>


<FlatList
 data={this.state.Resources}
  keyExtractor={(item, index) => item.resourceId}
  renderItem={({item}) => <TouchableHighlight>
   <View style={{backgroundColor: 'white', marginBottom: 10}}>
   <Text>{item.name}</Text>
   </View>
 
   </TouchableHighlight>}
/>

         
     </ScrollView>
      </View>
    );
  }
}
styles = StyleSheet.create({
  buttonGroupContainer: {
    marginHorizontal: 8,
  },
  addImageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 1.5,
    marginVertical: 14,
    borderRadius: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageTitle: {
    color: "gray",
    marginTop: 3,
  },
  closeModal: {
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    marginLeft: 20,
    marginTop: 19,
    color: "gray",
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    fontFamily: 'lato',
  },
  activityIndicator: {
    backgroundColor: "gray",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default search;