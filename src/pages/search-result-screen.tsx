import { useState, useCallback } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, Platform, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectList from "@/src/components/select-list";
import MediaList from "@/src/components/media-list";
import { Data } from "@/src/entities/data";
import axios from "axios";
import { ENV } from "@/config";

const SearchScreen: React.FC = () => {
  const [genre, setGenre] = useState<"movie" | "multi" | "tv">("movie");
  const [searchName, setSearchName] = useState<string>("");
  const [searchedData, setSearchedData] = useState<Data[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const APIKEY = ENV.API_KEY;
  const URL = ENV.BASE_URL;

  const handleSearch = useCallback(async () => {
    Keyboard.dismiss();
    if (!searchName.trim()) {
      setError("Movie/TV show name is required.");
      return;
    }
    setError(null);
    setIsSearched(true);

    try {
      const response = await axios.get(
        `${URL}/search/${genre}?query=${encodeURIComponent(searchName)}&api_key=${APIKEY}`
      );
      setSearchedData(response.data.results);

    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
      setSearchedData([]);
    }
  }, [searchName, genre])

  const handleInputChange = useCallback((text: string) => {
    setSearchName(text.trimStart());
    setError(null);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContainer}>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Search Movie/TV Show Name</Text>
              <Text style={styles.requiredText}> *</Text>
            </View>
            <View style={[styles.inputContainer, error && styles.inputError]}>
              <Ionicons name="search" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="i.e. James Bond, CSI..."
                onChangeText={handleInputChange}
                value={searchName}
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Choose Search Type</Text>
              <Text style={styles.requiredText}> *</Text>
            </View>
            <View style={styles.rowContainer}>
              <SelectList onValueChange={(value) => setGenre(value as "movie" | "tv" | "multi")} selectedValue={genre} mode="search" hasError={!!error} />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Ionicons name="search" size={20} color="white" />
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>

            <Text>Please select a search type</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {isSearched ? (
              searchedData.length > 0 ? (
                <MediaList type="search" category={genre} fetchedData={searchedData} />
              ) : (
                <Text style={styles.noResultsText}>No results found.</Text>
              )
            ) : (
              <Text style={styles.noResultsText}>Please initiate a search</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#273646",
  },
  requiredText: {
    color: "red",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 16,
    backgroundColor: "#E0E0E3",
  },
  inputError: {
    borderColor: "red",
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18ACCC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginLeft: 16,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 16,
  },
  noResultsText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 100,
    color: "#273646",
  },
});
