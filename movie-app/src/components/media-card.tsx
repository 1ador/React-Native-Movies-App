import { useRouter } from "expo-router";
import { Data } from "../entities/data";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface MediaCardProps {
  data: Data;
  mode: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ data, mode }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w300${data.poster_path}` }}
        alt="data poster image"
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title || data.name}</Text>
        <Text style={styles.details}>Popularity: {data.popularity}</Text>
        <Text style={styles.details}>Release Date: {data.release_date}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`./media-details?str=${mode}/${data.id}`)}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MediaCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color:"#273646"
  },
  details: {
    fontSize: 11,
    color: "#555",
  },
  button: {
    backgroundColor: "#18ACCC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});