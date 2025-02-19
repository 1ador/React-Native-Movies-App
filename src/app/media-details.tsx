import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Data } from "../entities/data";
import axios from "axios";
import { ENV } from "@/config";

const MediaDetails: React.FC = () => {
  const [detailData, setDetailData] = useState<Data | null>(null);
  const { str } = useLocalSearchParams();
  const navigation = useNavigation();
  const APIKEY = ENV.API_KEY;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${str}?api_key=${APIKEY}`
        );
        setDetailData(response.data);
        navigation.setOptions({
          title: response.data.title || response.data.name || "Details",
        });
        
      } catch (error) {
        console.error("Failed to fetch media details:", error);
        setError("Failed to load media details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [str, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {detailData?.title || detailData?.name}
      </Text>
      {detailData?.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${detailData.poster_path}` }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.overview}>{detailData?.overview}</Text>

      <View style={styles.bottomText}>
        <Text>
          {[detailData?.popularity && `Popularity: ${detailData.popularity}`,
          detailData?.release_date && `Release Date: ${detailData.release_date}`]
            .filter(Boolean)
            .join(" | ")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default MediaDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 20,
  },
  overview: {
    fontSize: 14,
    textAlign: "left",
    paddingHorizontal: 20,
  },
  bottomText: {
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
  }
});
