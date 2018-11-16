import React from "react";

import { View, StyleSheet, TextInput, Text, Button, ActivityIndicator } from "react-native";

import { createAccount } from "../actions";

import { connect } from "react-redux";

import FormRow from '../components/FormRow';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mail: '',
            password: '',
            repassword: '',
            isLoading: false,
            message: '',
        }
    }

    onChangeHandler(field, value) {
        this.setState({
           [field]: value 
        });
    }

    createAccount() {
        this.setState({ isLoading: true, message: '' });
        const { mail: email, password, repassword } = this.state;

        if (password !== repassword) {
            this.setState({ 
                isLoading: false, 
                message: this.getMessageByErrorCode('auth/password-not-equal') 
            });
            return;
        }

        this.props.createAccount({ email, password })
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

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'E-mail já em uso';
            case 'auth/operation-not-allowed':
                return 'Usuário já em uso';
            case 'auth/invalid-email':
                return 'E-mail inválido'; 
            case 'auth/weak-password':
                return 'Senha muito fraca'  
            case 'auth/password-not-equal':
                return 'As senhas devem ser iguais'
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
                <View style = {styles.margin20Top}>
                    <Button
                        title='Criar conta'
                        onPress={() => this.createAccount()} />
                </View>
            </View>
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

                <FormRow>
                    <TextInput 
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                <FormRow last>
                    <TextInput 
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry
                        value={this.state.repassword}
                        onChangeText={value => this.onChangeHandler('repassword', value)}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessage() }

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
    createAccount,
}

export default connect(null, mapDispatchToProps)(CreateAccount)