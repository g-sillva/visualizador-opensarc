import React, { useCallback, useMemo, useRef, useState } from "react";
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
  const [filter, setFilter] = useState({});
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["55%", "55%"], []);

  const handleFilterBtnPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleApplyFilter = useCallback((filter) => {
    setFilter(filter);
    bottomSheetModalRef.current?.dismiss();
  });

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.bottomSheetContainer}>
        <BottomSheetModalProvider>
          <HomeScreen
            onFilterBtnPress={handleFilterBtnPress}
            filters={filter}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <BottomSheetView style={styles.contentContainer}>
              <FilterForm values={filter} onSubmit={handleApplyFilter} />
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
