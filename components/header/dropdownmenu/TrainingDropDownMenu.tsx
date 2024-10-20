import { StyleSheet } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'
import {ReactElement, ReactNode} from "react";

export interface DropDownMenuProps {
    items: Array<{ // items for the dropdown menu
        key: string;
        title: string;
        icon: string;
        iconAndroid?: string
        group?: string;
    }>;
    onSelectItem: (key: string) => void; // Function to execute when selecting a dropdown item
    children: ReactElement; // The element that triggers the dropdown menu - in this case, a button
}

const TrainingDropDownMenu = ({items, onSelectItem, children}: DropDownMenuProps) => {
    // Organize items by groups
    const groupedItems = items.reduce((acc, item) => {
        // Setze einen Fallback-Wert für item.group, wenn es nicht definiert ist
        const group = item.group ?? "ungrouped";  // fallback to "ungrouped" if item.group is not defined

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
                          <DropdownMenu.Item key={item.key} onSelect={() => onSelectItem(item.key)}>
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
                    <DropdownMenu.Item key="rate" onSelect={() => console.log("Hier den Code für App Bewertung implementieren")}>
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