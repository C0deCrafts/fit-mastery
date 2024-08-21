import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="(chat)"
                options={{
                    title: 'Chat',
                }}
            />
            <Tabs.Screen
                name="(homes)"
                options={{
                    title: 'Homes',
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    title: 'Settings',
                }}
            />
            <Tabs.Screen
                name="(training)"
                options={{
                    title: 'Training',
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
