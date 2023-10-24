import { StyleSheet, Text, TouchableOpacity } from "react-native"

const Button = ( props ) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    borderRadius: 12,
    backgroundColor: "#6666FF"
  },
  buttonText: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 27,
    letterSpacing: -0.36,
    color: "#FBFBFB"
  }
})

export default Button