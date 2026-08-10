import { Link } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../utils/crud-api";

type PhoneData = {
  id: string;
  name: string;
  sect: string;
  tel: string;
};

type CardProps = {
  phone: PhoneData;
  refresh: () => void;
};

export default function Card({ phone, refresh }: CardProps) {
  const delPhone = async (id: string) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${phone.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete("phones/" + id);
              refresh();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {phone.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{phone.name}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{phone.sect}</Text>
            </View>
          </View>
          <Text style={styles.tel}>📞 {phone.tel}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Link
          href={{
            pathname: "/editPhone",
            params: {
              id: phone.id,
              name: phone.name,
              sect: phone.sect,
              tel: phone.tel,
            },
          }}
          push
          style={styles.editBtn}
        >
          <Text style={styles.editBtnText}>✏️ Edit</Text>
        </Link>
        <TouchableOpacity
          onPress={() => delPhone(phone.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4F46E5",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: "#E0E7FF",
    fontSize: 12,
    fontWeight: "600",
  },
  tel: {
    color: "#C7D2FE",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  editBtn: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});