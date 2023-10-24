import { StyleSheet, View } from "react-native"
import Circle from "./Circle"
import Cross from "./Cross"

const Logo = () => {
  return (
    <View style={styles.logo}>
    <View style={styles.subContainer}>
      <View style={styles.svgContainer}>
        <Cross width={"60px"} height={"60px"} color={"#6666FF"}/>
      </View>
      <View style={styles.svgContainer}>
        <Circle width={"60px"} height={"60px"} color={"#E85454"}/>
      </View>
    </View>
    <View style={styles.subContainer}>
      <View style={styles.svgContainer}>
        <Circle width={"60px"} height={"60px"} color={"#E85454"}/>
      </View>
      <View style={styles.svgContainer}>
        <Cross width={"60px"} height={"60px"} color={"#6666FF"}/>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    display: "flex",
    flexDirection: "column",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  svgContainer: {
    width: 100,
    height: 100
  }
})

export default Logo