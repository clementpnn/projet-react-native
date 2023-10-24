import { StyleSheet, TextInput } from "react-native"

const Input = ( props ) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  input : {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderRadius: 12,
    borderColor: "#6666FF",
    backgroundColor: "#F1F1F1",
    color: "#6666FF"
  }
})

export default Input