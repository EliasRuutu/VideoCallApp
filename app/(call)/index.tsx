import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../service/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in!', userCredential.user);
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      // Handle specific error codes here
      if (error.code === 'auth/wrong-password') {
        console.log('The password is invalid or the user does not have a password.');
      }
      if (error.code === 'auth/user-not-found') {
        console.log('No user found with this email.');
      }
    }
  };

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    signIn(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>JK LIBRAS</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/images/ear-icon.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.inputLabel}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>ESQUECEU SUA SENHA?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#436299',
  },
  header: {
    backgroundColor: '#436299',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 60
  },
  iconContainer: {
    position: "absolute",
    left: '50%',
    top: -40,
    transform: [{ translateX: -20 }],
    width: 80,
    height: 80,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#436299',
    fontSize: 12,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#FF7043',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#436299',
    fontSize: 12,
    fontWeight: '600'
  },
});