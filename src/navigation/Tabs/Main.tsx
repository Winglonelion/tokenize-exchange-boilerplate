import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";

import HomeIcon from "@/components/Icons/HomeIcon";
import MarketsIcon from "@/components/Icons/MarketsIcon";
import MenuIcon from "@/components/Icons/MenuIcon";
import PortfolioIcon from "@/components/Icons/PortfolioIcon";
import WalletsIcon from "@/components/Icons/WalletsIcon";
import MarketsScreen from "@/features/Markets/Markets.screen";
import MenuScreen from "@/features/Menu/Menu.screen";
import { Colors } from "@/styles/colors.theme";

import BlankScreen from "./Blank";
import { TabConfig } from "./config";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Markets"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarIcon: ({ color, size }) => renderTabIcon({ route, color, size }),
        lazy: true,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarStyle: styles.tabBarStyle,
      })}>
      <Tab.Screen
        name="Home"
        key="home"
        component={BlankScreen}
        options={TabConfig}
      />
      <Tab.Screen
        name="Markets"
        key="markets"
        component={MarketsScreen}
        options={TabConfig}
      />
      <Tab.Screen
        name="Wallets"
        key="wallets"
        component={BlankScreen}
        options={TabConfig}
      />
      <Tab.Screen
        name="Portfolio"
        key="portfolio"
        component={BlankScreen}
        options={TabConfig}
      />
      <Tab.Screen
        name="Menu"
        key="menu"
        component={MenuScreen}
        options={TabConfig}
      />
    </Tab.Navigator>
  );
}

function renderTabIcon({
  route,
  color,
}: {
  route: RouteProp<ParamListBase, string>;
  color: string;
  size: number;
}) {
  const { key = "" } = route;
  const [icon = ""] = key.toLowerCase().split("-");
  switch (icon) {
    case "home":
      return <HomeIcon tint={color} />;

    case "markets":
      return <MarketsIcon tint={color} />;

    case "wallets":
      return <WalletsIcon tint={color} />;

    case "portfolio":
      return <PortfolioIcon tint={color} />;

    case "menu":
      return <MenuIcon tint={color} />;

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 13,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "center",
    top: -6,
  },
  tabBarIconStyle: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
  },
  tabBarItemStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "red",
  },
  tabBarStyle: {
    borderTopWidth: 0,
    height: 65,
    paddingBottom: 0,
    paddingTop: 8,
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.05,
  },
});
