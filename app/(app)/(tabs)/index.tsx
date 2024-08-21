import {StyleSheet} from "react-native"
import {Redirect} from "expo-router";

// redirect to /homes by default when visiting the (tabs) route
const Page = () => {
  return (
      <Redirect href="/(homes)" />
  )

}

export default Page

const styles = StyleSheet.create({})