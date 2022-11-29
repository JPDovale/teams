import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storageMap/storageConfig"
import { getAllGroups } from "./getAllGroups"

export async function groupRemoveByName(groupName: string){
  try {
    const exiteGroups = await getAllGroups()
    const filteredGroups = exiteGroups.filter((group) => group !== groupName)

    const groupsToSave = JSON.stringify(filteredGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsToSave)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

  } catch (err) {
    throw err
  }
}