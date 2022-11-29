import AsyncStorage from "@react-native-async-storage/async-storage"
import { PLAYER_COLLECTION } from "@storageMap/storageConfig"
import { playersGetByGroup } from "./playersGetByGroups"

export async function playerRemoveByGroup(playerName: string, group: string){
  try {
    const storage = await playersGetByGroup(group)

    const filteredPlayers = storage.filter((player) => player.name !== playerName)
    const playersToSave = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playersToSave)
    
  } catch (err) {
    throw err
  }
}