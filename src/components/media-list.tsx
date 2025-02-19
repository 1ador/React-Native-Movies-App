import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MediaCard from "./media-card";
import axios from "axios";
import { ENV } from "@/config";
import { Data } from "../entities/data";

interface MediaListProps {
  type: "movie" | "search" | "tv";
  category: string;
  fetchedData?: Data[];
}

const MediaList = ({ type, category, fetchedData }: MediaListProps) => {
  const APIKEY = ENV.API_KEY;
  const [apiData, setApiData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fetchedData) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${category}?api_key=${APIKEY}&page=1`
        );
        setApiData(res.data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, category, fetchedData]);

  const dataToRender = fetchedData || apiData;

  return (
    <View style={styles.container}>
       {loading && !fetchedData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF1493" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : dataToRender.length > 0 ? (
        <View style={styles.listContainer}>
          {dataToRender.map((item) => (
            <MediaCard key={item.id} data={item} mode={type} />
          ))}
        </View>
      ) : (
        <Text style={styles.noResultsText}>No data available.</Text>
      )}
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  noResultsText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 100,
  },
});
