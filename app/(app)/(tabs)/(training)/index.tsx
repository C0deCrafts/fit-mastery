import CustomTabScreen from "@/components/navigation/toptabs/CustomTabScreen";
import OverviewContent from "@/components/navigation/segmentscreens/training/OverviewContent";
import TrainingContent from "@/components/navigation/segmentscreens/training/TrainingContent";

const TrainingIndex = () => {
    const tabs = ["Übersicht", "Training"];

    const renderContent = (tab: string) => {
        switch (tab) {
            case "Übersicht":
                return <OverviewContent />;
            case "Training":
                return <TrainingContent />;
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
            headerTitle="Training"
            customDropdownMenuVisible={true}
            dropdownMenuItems={[
                { key: "0", title: "Eigenen Plan erstellen", icon: "figure.highintensity.intervaltraining" },
            ]}
            onSelectItem={handleDropdownSelect}
        />
    );
};

export default TrainingIndex;
