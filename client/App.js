import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterForm from "./src/components/FilterForm";

export default function App() {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["65%", "65%"], []);

  const handleFilterBtnPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.bottomSheetContainer}>
        <BottomSheetModalProvider>
          <HomeScreen onFilterBtnPress={handleFilterBtnPress} />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <FilterForm />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  bottomSheetContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.05,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
