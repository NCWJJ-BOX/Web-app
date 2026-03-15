import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const enter = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const open = React.useCallback(async (url: string) => {
    try {
      const can = await Linking.canOpenURL(url);
      if (!can) return;
      await Linking.openURL(url);
    } catch {
      // ignore
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View pointerEvents="none" style={styles.bg}>
        <View style={styles.blobA} />
        <View style={styles.blobB} />
        <View style={styles.grid} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: enter,
            transform: [
              {
                translateY: enter.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
        >
          <View style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Expo • Native</Text>
            </View>
            <Text style={styles.title}>หน้าแอพพร้อมแล้ว</Text>
            <Text style={styles.subtitle}>
              ไฟล์นี้อยู่ที่ native/App.tsx และไม่กระทบ Next.js (เว็บ)
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <Text style={styles.cardText}>
              ใช้มือถือสแกน QR ใน Expo Go เพื่อเปิดแอพบนเครื่องจริง
            </Text>
            <View style={styles.actionsRow}>
              <ActionButton
                label="Expo Docs"
                onPress={() => open("https://docs.expo.dev/")}
                variant="secondary"
              />
              <ActionButton
                label="RN Docs"
                onPress={() => open("https://reactnative.dev/")}
                variant="secondary"
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Web App Link</Text>
            <Text style={styles.cardText}>
              ถ้าต้องการเปิดเว็บจากมือถือ ให้ใช้ IP ของคอมคุณแทน localhost
            </Text>
            <View style={styles.codeRow}>
              <Text style={styles.code}>http://YOUR_PC_IP:3000</Text>
              <Text style={styles.hint}>
                ({Platform.OS === "android" ? "Android" : "iOS"})
              </Text>
            </View>
            <ActionButton
              label="Open Example"
              onPress={() => open("http://127.0.0.1:3000")}
              variant="primary"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tip: เปลี่ยนสี/ฟอนต์/เลย์เอาต์ได้ต่อใน `native/App.tsx`
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function ActionButton(props: {
  label: string;
  onPress: () => void;
  variant: "primary" | "secondary";
}) {
  const { label, onPress, variant } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === "primary" ? styles.btnPrimary : styles.btnSecondary,
        pressed && styles.btnPressed,
      ]}
    >
      <Text
        style={[
          styles.btnText,
          variant === "primary" ? styles.btnTextPrimary : styles.btnTextSecondary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F1E8",
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  blobA: {
    position: "absolute",
    top: -90,
    left: -70,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(217, 108, 58, 0.20)",
    transform: [{ rotate: "18deg" }],
  },
  blobB: {
    position: "absolute",
    bottom: -120,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 280,
    backgroundColor: "rgba(47, 111, 109, 0.18)",
    transform: [{ rotate: "-12deg" }],
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "#1E1B16",
    borderLeftWidth: 1,
    borderLeftColor: "#1E1B16",
    transform: [{ rotate: "0deg" }],
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 14,
  },
  hero: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(30, 27, 22, 0.10)",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(30, 27, 22, 0.06)",
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: "#1E1B16",
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1B16",
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(30, 27, 22, 0.78)",
    lineHeight: 20,
  },
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(30, 27, 22, 0.10)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1B16",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(30, 27, 22, 0.74)",
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
  },
  btnPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  btnPrimary: {
    backgroundColor: "#1E1B16",
    borderColor: "rgba(30, 27, 22, 0.12)",
    alignSelf: "flex-start",
  },
  btnSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.60)",
    borderColor: "rgba(30, 27, 22, 0.12)",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  btnTextPrimary: {
    color: "#F6F1E8",
  },
  btnTextSecondary: {
    color: "#1E1B16",
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(30, 27, 22, 0.06)",
    marginBottom: 12,
  },
  code: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B16",
  },
  hint: {
    fontSize: 12,
    color: "rgba(30, 27, 22, 0.58)",
  },
  footer: {
    paddingTop: 6,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(30, 27, 22, 0.55)",
  },
});
