import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utilsMap/AppError";

import { GROUP_COLLECTION } from "@storageMap/storageConfig";
import { getAllGroups } from "./getAllGroups";

export async function groupCreate(newGroupName: string){
  try {
    const exiteGroups = await getAllGroups()

    const groupAlreadyExists = exiteGroups.includes(newGroupName)
    
    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.")
    }

    const groups = [newGroupName, ...exiteGroups]

    const groupsToSave = JSON.stringify(groups)

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsToSave)
  } catch (err) {
    throw err
  }
}