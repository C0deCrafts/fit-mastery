import {View} from 'react-native'
import {ReactNode} from "react";

interface SpacingProps {
    vertical?: number;
    horizontal?: number;
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    children?: ReactNode;
}
/**
 * Spacing is a utility component that applies custom margins to its children.
 * You can specify individual margins or use the vertical and horizontal props for symmetric spacing.
 *
 * @param {SpacingProps} props - The properties for configuring the Spacing component.
 * @param {number} [props.vertical] - Optional: Sets the vertical margins (top and bottom).
 * @param {number} [props.horizontal] - Optional: Sets the horizontal margins (left and right).
 * @param {number} [props.bottom] - Optional: Sets the bottom margin.
 * @param {number} [props.top] - Optional: Sets the top margin.
 * @param {number} [props.left] - Optional: Sets the left margin.
 * @param {number} [props.right] - Optional: Sets the right margin.
 * @param {ReactNode} [props.children] - Optional: The content to be wrapped and spaced by the Spacing component.
 *
 * @example
 * <Spacing vertical={10}>
 *    <Text>Content with vertical spacing</Text>
 * </Spacing>
 */
const Spacing = (props: SpacingProps) => {

    return (
        <View style={
            {
                marginTop: props.top,
                marginBottom: props.bottom,
                marginLeft: props.left,
                marginRight: props.right,
                marginVertical: props.vertical,
                marginHorizontal: props.horizontal
            }
        }
        >{props.children}</View>
    )
}

export default Spacing