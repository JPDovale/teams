import AsyncStorage from "@react-native-async-storage/async-storage"
import { playersGetByGroup } from "./playersGetByGroups"

export async function playerGetByGroupAdnTeam(group: string, team: string){
  try {
    const storage = await playersGetByGroup(group)

    const playersThisTeam = storage.filter((player) => player.team === team)

    return playersThisTeam

  } catch (err) {
    throw err
  }
}