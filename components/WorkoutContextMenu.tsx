import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as ContextMenu from "zeego/context-menu";
import { useRouter } from 'expo-router';

interface WorkoutContextMenuProps {
    children: React.ReactNode;
    isFavorite: boolean; // Neuer prop, der angibt, ob das Workout in den Favoriten ist
    onRemoveFromFavorites: () => void;
    onAddToFavorites: () => void;
    onDeleteWorkout: () => void;
    onShareWorkout: () => void;
}

const WorkoutContextMenu = ({
                                children,
                                isFavorite,
                                onRemoveFromFavorites,
                                onAddToFavorites,
                                onDeleteWorkout,
                                onShareWorkout
                            }: WorkoutContextMenuProps) => {
    const router = useRouter();

    const handleNavigate = () => {
        // Führe die Navigation oder Aktion bei Short Press aus
        console.log("Navigate to Workout Details");
    };

    const handleContextMenu = () => {
        // Dies wird beim langen Drücken ausgeführt
        console.log("Context Menu Triggered");
    };

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <Pressable
                    onPress={handleNavigate}  // Bei kurzem Drücken navigieren
                    onLongPress={handleContextMenu}  // Bei langem Drücken Kontextmenü öffnen
                >
                    {children}
                </Pressable>
            </ContextMenu.Trigger>

            <ContextMenu.Content>
                {/* Bedingte Anzeige basierend auf dem Favoritenstatus */}
                {isFavorite ? (
                    <ContextMenu.Item key="remove-favorite" onPress={onRemoveFromFavorites}>
                        <ContextMenu.ItemTitle>Von Favoriten entfernen</ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                            ios={{
                                name: "heart.slash",
                                pointSize: 18,
                            }}
                        />
                    </ContextMenu.Item>
                ) : (
                    <ContextMenu.Item key="add-favorite" onPress={onAddToFavorites}>
                        <ContextMenu.ItemTitle>Zu Favoriten hinzufügen</ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                            ios={{
                                name: "heart",
                                pointSize: 18,
                            }}
                        />
                    </ContextMenu.Item>
                )}

                <ContextMenu.Item key="share" onPress={onShareWorkout}>
                    <ContextMenu.ItemTitle>Teile dein Workout</ContextMenu.ItemTitle>
                    <ContextMenu.ItemSubtitle>mit deinen Freunden</ContextMenu.ItemSubtitle>
                    <ContextMenu.ItemIcon
                        ios={{
                            name: "shared.with.you",
                            pointSize: 18,
                        }}
                    />
                </ContextMenu.Item>

                <ContextMenu.Item key="delete" onPress={onDeleteWorkout}>
                    <ContextMenu.ItemTitle>Löschen</ContextMenu.ItemTitle>
                    <ContextMenu.ItemIcon
                        ios={{
                            name: "trash.fill",
                            pointSize: 18,
                        }}
                    />
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    );
}

export default WorkoutContextMenu;

const styles = StyleSheet.create({
    preview: {
        width: 200,
        padding: 0,
    },
});
