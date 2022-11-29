import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storageMap/storageConfig";
import { AppError } from "@utilsMap/AppError";
import { playersGetByGroup } from "./playersGetByGroups";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {
    const playersExiste = await playersGetByGroup(group)
    const playerAlreadyExists = playersExiste.filter((player) => player.name === newPlayer.name)

    if(playerAlreadyExists[0]){
      throw new AppError('Essa pessoa já foi adicionada em um time.')
    }

    const storage = JSON.stringify([newPlayer, ...playersExiste])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (err) {
    throw err
  }
}