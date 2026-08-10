import { Link } from "expo-router";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
    const deleteAction = async () => {
      try {
        await api.delete("phones/" + id);
        refresh();
      } catch (err) {
        console.log("Delete error:", err);
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Are you sure you want to delete ${phone.name}?`)) {
        deleteAction();
      }
    } else {
      Alert.alert(
        "Confirm Delete",
        `Are you sure you want to delete ${phone.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: deleteAction,
          },
        ]
      );
    }
  };

  // Extract initials for the avatar
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Left Accent Bar */}
        <View style={[styles.accentBar, { backgroundColor: phone.sect === 'CED' ? '#3B82F6' : '#8B5CF6' }]} />
        
        <View style={styles.contentWrapper}>
          {/* Top Section: Avatar & Info */}
          <View style={styles.topSection}>
            <View style={[styles.avatar, { backgroundColor: phone.sect === 'CED' ? '#EFF6FF' : '#F5F3FF' }]}>
              {phone.image ? (
                <Image source={{ uri: phone.image }} style={styles.avatarImage} />
              ) : (
                <Text style={[styles.avatarText, { color: phone.sect === 'CED' ? '#1D4ED8' : '#6D28D9' }]}>
                  {getInitials(phone.name)}
                </Text>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.nameText} numberOfLines={1}>{phone.name}</Text>
              <View style={styles.badgeContainer}>
                <View style={[styles.badge, { backgroundColor: phone.sect === 'CED' ? '#DBEAFE' : '#EDE9FE' }]}>
                  <Text style={[styles.badgeText, { color: phone.sect === 'CED' ? '#1E40AF' : '#5B21B6' }]}>
                    {phone.sect}
                  </Text>
                </View>
                <Text style={styles.telText}>📞 {phone.tel}</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <Link
              href={{
                pathname: "/editPhone",
                params: {
                  id: phone.id,
                  name: phone.name,
                  sect: phone.sect,
                  tel: phone.tel,
                  image: phone.image || "",
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <Text style={styles.editButtonText}>✏️ Edit</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => delPhone(phone.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  accentBar: {
    width: 6,
  },
  contentWrapper: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "800",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  telText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 14,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  editButton: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  editButtonText: {
    color: "#D97706",
    fontSize: 14,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  deleteButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "700",
  },
});