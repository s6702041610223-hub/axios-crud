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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📱</Text>
        <Text style={styles.headerTitle}>Student Phones</Text>
        <Text style={styles.headerSubtitle}>
          {data.length} contact{data.length !== 1 ? "s" : ""} saved
        </Text>
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
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>No contacts yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the button above to add your first contact
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
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
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  headerEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#C7D2FE",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 16,
    marginTop: -18,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
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
  },
});
