import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import chatScreen from '../screens/chatScreen';
import editProfileScreen from '../screens/editProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/profileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          borderBottomWidth: 4,
          borderBottomColor: '#FF9494',
          backgroundColor: '#FFE3E1',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            ...styles.shadow,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

export const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Peach"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#FF9494',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={MessageScreen}
      options={({route}) => ({
        headerBackTitleVisible: false,
        tabBarVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#FF9494',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
    <Stack.Screen
      name="Chat"
      component={chatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
        tabBarVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#FF9494',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={editProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({focused, size}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#7F5283' : 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Home
              </Text>
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        })}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#7F5283' : 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Post
              </Text>
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          display: 'none',
          tabBarIcon: ({focused, size}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#7F5283' : 'black',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Chat
              </Text>
            </View>
          ),

          tabBarButton: props => <TabBarCustomButton {...props} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#7F5283' : 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Profile
              </Text>
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    backgroundColor: 'white',
    height: 70,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
});
