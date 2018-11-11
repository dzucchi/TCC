import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Line = ({label = "", content = "" }) => {
    return (
        <View style={styles.line}>
            <Text style={[styles.label]}>{ label }</Text>
            <Text style={[styles.cell, styles.content]}>{ content }</Text>    
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        paddingTop: 3,
        paddingBottom: 3,
        borderColor: '#C5C5C5'
   },
   cell: {
        fontSize: 18,
        paddingLeft: 5,
   },
   label: {
        color: '#778899',
        fontWeight: 'bold',
        paddingLeft: 5,
   },
   content: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1
   },
});

export default Line;