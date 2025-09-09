import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from 'phosphor-react-native';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {

    const tabbarIcons : any = {
        index: (IsFocused: boolean)=>(
            <Icons.House
            size={verticalScale(30)}
            weight={IsFocused? "fill": "regular"}
            color={IsFocused? colors.primary: colors.neutral400}
            />
        ),
        statistics: (IsFocused: boolean)=>(
            <Icons.ChartBar
            size={verticalScale(30)}
            weight={IsFocused? "fill": "regular"}
            color={IsFocused? colors.primary: colors.neutral400}
            />
        ),
        wallet: (IsFocused: boolean)=>(
            <Icons.Wallet
            size={verticalScale(30)}
            weight={IsFocused? "fill": "regular"}
            color={IsFocused? colors.primary: colors.neutral400}
            />
        ),
        profile: (IsFocused: boolean)=>(
            <Icons.User
            size={verticalScale(30)}
            weight={IsFocused? "fill": "regular"}
            color={IsFocused? colors.primary: colors.neutral400}
            />
        ),

    }
  
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any=
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            //href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={ styles.tabbarItem}
          >
            {
                tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{
        flexDirection: 'row', 
        width: '100%', 
        height: Platform.OS == 'android'? verticalScale(73) : verticalScale(55),
        backgroundColor: colors.neutral800,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: colors.neutral700,
        borderTopWidth: 1,
    },
    tabbarItem: {
        marginBottom:Platform.OS == 'android'? spacingY._10: spacingY._5,
        justifyContent: "center",
        alignItems: "center",

    }
})