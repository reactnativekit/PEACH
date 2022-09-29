import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/peaches.png')}
        style={styles.logo}
      />
      <Image
        resizeMode="contain"
        source={require('../assets/peach.png')}
        style={styles.title}
      />
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
        style={styles.btn}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  logo: {
    height: 143,
    width: 160,
    backgroundColor: 'white',
  },
  title: {
    height: 140,
    width: 160,
    backgroundColor: 'white',
  },
  btn: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF9494',
    borderRadius: 10,
    alignItems: 'center',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FA9494',
    fontFamily: 'Lato-Regular',
  },
});
