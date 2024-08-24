import {Modal, TouchableOpacity, Button, StyleSheet} from "react-native";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import {ReactNode} from "react";

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    onCloseLabel?: string;
    children: ReactNode;
}
/**
 * CustomModal is a reusable component that displays a modal with customizable content and a close button.
 * The modal can be configured to show or hide based on the isVisible prop, and it includes a close button
 * with a customizable label.
 *
 * @param {CustomModalProps} props - The properties for configuring the CustomModal component.
 * @param {boolean} props.isVisible - Controls whether the modal is visible or not.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 * @param {string} [props.onCloseLabel="Schließen"] - Optional: The label for the close button. Defaults to "Schließen".
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @example
 * <CustomModal isVisible={true} onClose={() => console.log('Modal closed')}>
 *    <Text>Modal Content</Text>
 * </CustomModal>
 */
const CustomModal = ({onCloseLabel = "Schließen", ...props}: CustomModalProps) => {
    const {colors, fontSizes} = useAppStyle();
    const styles = dynamicStyles(colors, fontSizes);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={props.onClose} activeOpacity={1}>
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                    {props.children}
                    <Button title={onCloseLabel} onPress={props.onClose} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default CustomModal;

const dynamicStyles = (colors: Colors, fontSize: FontSize) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.secondaryLabel
    },
    modalContent: {
        width: "100%",
        padding: 20,
        backgroundColor: colors.secondary,
        borderTopLeftRadius: ThemeSizes.Radius.modal,
        borderTopRightRadius: ThemeSizes.Radius.modal,
    },
    modalText: {
        fontSize: fontSize.body,
        textAlign: "center",
        color: colors.label
    },
    pickerItem: {
        color: colors.label,
        fontSize: fontSize.title2,
    }
});
