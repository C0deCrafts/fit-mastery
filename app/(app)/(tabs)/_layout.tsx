import {Tabs} from 'expo-router';
import {useAppStyle} from "@/context/AppStyleContext";
import {Icons, ThemeSizes} from "@/constants";
import TabIcon from "@/components/navigation/TabBarIcon";

export default function TabsLayout() {
    const {colors} = useAppStyle();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.baseColor,
            tabBarInactiveTintColor: colors.secondaryLabel,
            tabBarStyle: {
                backgroundColor: "transparent",
                borderTopWidth: 0,
                paddingHorizontal: ThemeSizes.Spacing.tabBarHorizontal,
                position: "absolute",
                elevation: 0,
            },
        }}>
            <Tabs.Screen
                name="(chat)"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={Icons.friends}
                            color={color} name="Chat"
                            focused={focused}
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
            <Tabs.Screen
                name="(homes)"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={Icons.profile}
                            color={color} name="Home"
                            focused={focused}
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
            <Tabs.Screen
                name="(training)"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={Icons.barbell}
                            color={color} name="Training"
                            focused={focused}
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={Icons.setting}
                            color={color} name="Einstellungen"
                            focused={focused}
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
            <Tabs.Screen
                // This is a hidden tab
                name="index"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
