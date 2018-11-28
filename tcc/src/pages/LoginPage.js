import React from "react";

import { View, StyleSheet, TextInput, Text, Button, ActivityIndicator } from "react-native";

import firebase from "firebase";

import { tryLogin, tryLoginWithFacebook } from "../actions";

import { connect } from "react-redux";

import FormRow from '../components/FormRow';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyBDKYo0euOjNV3KwuuVD__FJpntVkWQkfE",
            authDomain: "furb-tcc.firebaseapp.com",
            databaseURL: "https://furb-tcc.firebaseio.com",
            projectId: "furb-tcc",
            storageBucket: "furb-tcc.appspot.com",
            messagingSenderId: "112702997561"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value) {
        this.setState({
           [field]: value 
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail: email, password } = this.state;

        this.props.tryLogin({ email, password })
            .then((user) => {
                if (user) {
                    this.props.navigation.replace('Main');
                } else {
                    this.setState({
                        isLoading: false,
                        message: ''
                    });
                }
            })
            .catch(error => {
                this.setState({ 
                    isLoading: false, 
                    message: this.getMessageByErrorCode(error.code) 
                });
            });
    }

    async logInFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('359751571431590', {
            permissions: ['public_profile'],
        });
        this.props.tryLoginWithFacebook({ type, token })
            .then((user) => {
                if (user) {
                    this.props.navigation.replace('Main');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Usuário ou Senha inválido';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/invalid-email':
                return 'E-mail inválido';
            default :
                return 'Erro desconhecido';
        }
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;
        
        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }
    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <View>
                <View>
                    <Button
                        title='Entrar'
                        onPress={() => this.tryLogin()} />
                </View>
                <View style = {styles.margin20Top}>
                    <Button
                        title='Criar conta'
                        onPress={() => this.props.navigation.replace('CreateAccount')} />
                </View>
            </View>
        );
    }

    renderButtonFacebook() {
        return (
            <Button 
                title='Logar com Facebook'
                color='#3b5998'
                onPress={() => this.logInFacebook()}/>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessage() }

                <View style={styles.label}>
                    <Text>
                        Ou conecte-se com sua rede social
                    </Text>
                </View>
                
                { this.renderButtonFacebook() }

            </View>
        )
    }
}

// rnss
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    label: {
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    margin20Top: {
        marginTop: 10,
    }
});

const mapDispatchToProps = {
    tryLogin,
    tryLoginWithFacebook,
}

export default connect(null, mapDispatchToProps)(LoginPage)