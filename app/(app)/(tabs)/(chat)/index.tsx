import CustomTabScreen from "@/components/navigation/toptabs/CustomTabScreen";
import AllChatsContent from "@/components/navigation/segmentscreens/chats/AllChatsContent";
import GroupChatContent from "@/components/navigation/segmentscreens/chats/GroupChatContent";
import PrivateChatContent from "@/components/navigation/segmentscreens/chats/PrivateChatContent";

const ChatIndex = () => {
    const tabs = ["Alle", "Gruppen", "Privatchats"];

    const renderContent = (tab: string) => {
        switch (tab) {
            case "Alle":
                return <AllChatsContent />;
            case "Gruppen":
                return <GroupChatContent />;
            case "Privatchats":
                return <PrivateChatContent />;
            default:
                return null;
        }
    };

    const handleDropdownSelect = (key: string) => {
        console.log("Selected item from dropdown:", key);
    };

    return (
        <CustomTabScreen
            tabs={tabs}
            renderContent={renderContent}
            headerTitle="Chats"
            customDropdownMenuVisible={true}
            dropdownMenuItems={[
                { key: "0", title: "Neue Gruppe erstellen", icon: "person.3.fill" },
                { key: "1", title: "Freunde einladen", icon: "person.crop.circle.badge.plus" },
                { key: "2", title: "Support kontaktieren", icon: "questionmark.circle" },
            ]}
            onSelectItem={handleDropdownSelect}
        />
    );
}

export default ChatIndex;