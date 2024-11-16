import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as ContextMenu from "zeego/context-menu";
import { useRouter } from 'expo-router';
import {ReactNode} from "react";

interface WorkoutContextMenuProps {
    children: ReactNode;
    isFavorite: boolean; // Neuer prop, der angibt, ob das Workout in den Favoriten ist
    erasable: boolean; // gibt an, ob card löschbar ist
    onAddToFavorites?: () => void;
    onRemoveFromFavorites?: () => void;
    onDeleteWorkout?: () => void;
    onShareWorkout?: () => void;
}

const WorkoutContextMenu = ({
                                children,
                                isFavorite,
                                erasable,
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
            <ContextMenu.Trigger action="longPress">
                <Pressable
                    onPress={handleNavigate}  // Bei kurzem Drücken navigieren
                    //onLongPress={handleContextMenu}  // Bei langem Drücken Kontextmenü öffnen
                >
                    {children}
                </Pressable>
            </ContextMenu.Trigger>

            <ContextMenu.Content
                loop={false}
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={10}
            >
                {/* Bedingte Anzeige basierend auf dem Favoritenstatus */}
                {isFavorite ? (
                    <ContextMenu.Item key="remove-favorite" onSelect={onRemoveFromFavorites}>
                        <ContextMenu.ItemTitle>Von Favoriten entfernen</ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                            ios={{
                                name: "star.slash.fill",
                                pointSize: 18,
                            }}
                        />
                    </ContextMenu.Item>
                ) : (
                    <ContextMenu.Item key="add-favorite" onSelect={onAddToFavorites}>
                        <ContextMenu.ItemTitle>Zu Favoriten hinzufügen</ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                            ios={{
                                name: "star",
                                pointSize: 18,
                            }}
                        />
                    </ContextMenu.Item>
                )}

                <ContextMenu.Item key="share" onSelect={onShareWorkout}>
                    <ContextMenu.ItemTitle>Teile dein Workout</ContextMenu.ItemTitle>
                    <ContextMenu.ItemSubtitle>mit deinen Freunden</ContextMenu.ItemSubtitle>
                    <ContextMenu.ItemIcon
                        ios={{
                            name: "shared.with.you",
                            pointSize: 18,
                        }}
                    />
                </ContextMenu.Item>

                {erasable &&
                    <ContextMenu.Item key="delete" onSelect={onDeleteWorkout}>
                        <ContextMenu.ItemTitle>Löschen</ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                            ios={{
                                name: "trash.fill",
                                pointSize: 18,
                            }}
                        />
                    </ContextMenu.Item>
                }
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
