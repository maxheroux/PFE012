
import { NavigationActions } from "react-navigation";

export const goToMain = NavigationActions.navigate({
    routeName: 'Main'
})
export const goToConnection = NavigationActions.navigate({
    routeName: 'Connection'
})
export const goToCreateThermostat = NavigationActions.navigate({
    routeName: 'CreateThermostat'
})
export const goToModifyThermostat = (itemIdList) => NavigationActions.navigate({
    routeName: 'ModifyThermostat',
    params: {
      itemIdList
    }
})
export const goToCreateLight = NavigationActions.navigate({
    routeName: 'CreateLight'
})
export const goToModifyLight = (itemIdList) => NavigationActions.navigate({
    routeName: 'ModifyLight',
    params: {
      itemIdList
    }
})
export const goToCreateLock = NavigationActions.navigate({
    routeName: 'CreateLock'
})
export const goToModifyLock = (itemIdList) => NavigationActions.navigate({
    routeName: 'ModifyLock',
    params: {
      itemIdList
    }
})
export const goToCreateOtherPeripheral = NavigationActions.navigate({
    routeName: 'CreateOtherPeripheral'
})
export const goToRoute = (routeName) => NavigationActions.navigate({
    routeName: routeName
})
