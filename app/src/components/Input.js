import { StyleSheet, TextInput, View } from "react-native"

const Input = ( props ) => {
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input : {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 51,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6666FF",
    backgroundColor: "#F1F1F1",
    color: "#6666FF",
    fontWeight: 700
  }
})

export default Input