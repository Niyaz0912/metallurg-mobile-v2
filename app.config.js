export default {
  expo: {
    name: "Металлург Mobile Clean",
    slug: "metallurg-mobile-clean",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon_mettl.png",
    userInterfaceStyle: "light",

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon_mettl.png",
        backgroundColor: "#2c3e50"
      },
      package: "com.niyaz0912.metallurgmobileclean",
      usesCleartextTraffic: true
    },


    plugins: ["expo-secure-store"],

    extra: {
      eas: {
        projectId: "f116e8a7-3bc2-437d-a401-eb627c6fd7dd"
      },
      apiUrl: "http://159.255.39.41"
    }
  }
};

