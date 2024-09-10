import { StyleSheet } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'
import {ReactElement, ReactNode} from "react";

export interface DropDownMenuProps {
    items: Array<{
        key: string;
        title: string;
        icon: string;
        iconAndroid?: string
        group?: string;
    }>;
    onSelect: (key: string) => void;
    children: ReactElement;
}

const TrainingDropDownMenu = ({items, onSelect, children}: DropDownMenuProps) => {
    // Organize items by groups
    const groupedItems = items.reduce((acc, item) => {
        // Setze einen Fallback-Wert für item.group, wenn es nicht definiert ist
        const group = item.group ?? "ungrouped";  // Fallback für undefined group

        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {} as Record<string, typeof items>);

    return (
      <DropdownMenu.Root>
          <DropdownMenu.Trigger>
              {children}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
              loop={true}
              side="bottom"
              align="start"
              sideOffset={5}
              alignOffset={5}
              avoidCollisions={true}
              collisionPadding={10}
          >
              {Object.keys(groupedItems).map((group) => (
                  <DropdownMenu.Group key={group}>
                      {/* Render items in this group */}
                      {groupedItems[group]?.map((item) => (
                          <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
                              <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
                              <DropdownMenu.ItemIcon
                                  ios={{
                                      name: item.icon,
                                      pointSize: 18,
                                  }}
                              />
                          </DropdownMenu.Item>
                      ))}
                  </DropdownMenu.Group>
              ))}
              <DropdownMenu.Group>
                    <DropdownMenu.Item key="close" onSelect={() => {}}>
                        <DropdownMenu.ItemTitle>Magst du FitMastery?</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemSubtitle>Bewerte die App</DropdownMenu.ItemSubtitle>
                        <DropdownMenu.ItemIcon
                            ios={{
                            name: "star",
                            pointSize: 18,
                        }}
                        />
                    </DropdownMenu.Item>
              </DropdownMenu.Group>
          </DropdownMenu.Content>
      </DropdownMenu.Root>
  )
}

export default TrainingDropDownMenu

const styles = StyleSheet.create({})