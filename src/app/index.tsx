import Card from "@/components/card";
import api from "@/utils/crud-api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Phone = {
  id: string;
  name: string;
  sect: string;
  tel: string;
};

export default function Index() {
  const [data, setData] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // New State for Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSect, setFilterSect] = useState<"All" | "CED" | "TCT">("All");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get("phones");
      setData(response.data);
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  // Filter the data based on search and section
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tel.includes(searchQuery);
    const matchesSect = filterSect === "All" || item.sect === filterSect;
    return matchesSearch && matchesSect;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerEmoji}>📱</Text>
          <View>
            <Text style={styles.headerTitle}>Student Phones</Text>
            <Text style={styles.headerSubtitle}>
              {data.length} contact{data.length !== 1 ? "s" : ""} saved
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone..."
            placeholderTextColor="#A5B4FC"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.filterContainer}>
          {(["All", "CED", "TCT"] as const).map((sect) => (
            <TouchableOpacity
              key={sect}
              style={[
                styles.filterPill,
                filterSect === sect && styles.filterPillActive,
              ]}
              onPress={() => setFilterSect(sect)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filterSect === sect && styles.filterPillTextActive,
                ]}
              >
                {sect}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/addPhone")}
        style={styles.addButton}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>＋ Add New Contact</Text>
      </TouchableOpacity>

      {/* List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      ) : filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>No contacts found</Text>
          <Text style={styles.emptySubtext}>
            {data.length === 0 
              ? "Tap the button above to add your first contact"
              : "Try adjusting your search or filter"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card phone={item} refresh={getData} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#4F46E5",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerEmoji: {
    fontSize: 42,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#C7D2FE",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  filterPillActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  filterPillText: {
    color: "#C7D2FE",
    fontWeight: "600",
    fontSize: 14,
  },
  filterPillTextActive: {
    color: "#4F46E5",
    fontWeight: "800",
  },
  addButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 20,
    marginTop: -22,
    marginBottom: 12,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 30,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
});
