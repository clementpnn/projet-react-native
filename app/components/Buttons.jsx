import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const Button = ({ data }) => {
  return (
      <TouchableOpacity style={styles.button} onPress={data.onPress}>
        <Text style={styles.ButtonDm}>{data.text}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#6666FF"
  },
  ButtonDm: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 27,
    color: "#FBFBFB"
  },
})

export default Button