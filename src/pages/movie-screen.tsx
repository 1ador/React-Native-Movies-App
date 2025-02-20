import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import SelectList from "@/src/components/select-list";
import MediaList from "@/src/components/media-list";
import PageControl from "@/src/components/page-control";
import { usePagination } from "@/src/hooks/use-pagination";
import { ENV } from "@/config";

const MovieScreen: React.FC = () => {
  const APIKEY = ENV.API_KEY;
  const URL = ENV.BASE_URL;
  const [category, setCategory] = useState<string>("popular");
  const [fetchUrl, setFetchUrl] = useState(
    `${URL}/movie/${category}?api_key=${APIKEY}`
  );

  useEffect(() => {
    setFetchUrl(`${URL}/movie/${category}?api_key=${APIKEY}`);
  }, [category]);

  const { fetchedData, loading, page, totalPages, handleNextPage, handlePreviousPage, getCurrentPageData } =
    usePagination({ fetchUrl });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
        <View style={styles.select}>
          <SelectList selectedValue={category} onValueChange={setCategory} mode={"movie"} />
        </View>

        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={{ flex: 1 }}>
              <MediaList type="movie" category={category} fetchedData={getCurrentPageData()} />
            </View>
          )}

          <PageControl
            page={page}
            onNext={handleNextPage}
            onPrev={handlePreviousPage}
            disableNext={page >= totalPages}
            disablePrev={page === 1}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default MovieScreen;

const styles = StyleSheet.create({
  select: {
    marginTop: 16,
    alignItems: "center",
    width: "100%"
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
});

