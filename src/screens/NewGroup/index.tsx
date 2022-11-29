import { useState } from "react";
import { Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import { AppError } from "@utilsMap/AppError";
import { groupCreate } from "@storageMap/group/groupCreate";

import { Button } from "@componentsMap/Button";
import { Header } from "@componentsMap/Header";
import { Highlight } from "@componentsMap/Highlight";
import { Input } from "@componentsMap/Input";

import { Icon, NewGroupContainer, NewGroupContent } from "./styles";

export function NewGroup(){
  const [newGroupName, setNewGroupName] = useState('')

  const navigation = useNavigation()

  async function handleNew(){
    try {
      if(!newGroupName){
        return Alert.alert('Novo grupo', 'A turma precisa de um nome para ser criada.')
      }

      await groupCreate(newGroupName)

      navigation.navigate('players', { group: newGroupName })  
      setNewGroupName('')

    } catch (err) {
      if(err instanceof AppError){
        Alert.alert('Novo grupo', err.message)
      }else{
        Alert.alert('Novo grupo', 'Não foi possível cadastrar um novo grupo')
      }
    }
  }

  return(
    <NewGroupContainer>
      <Header showBackButton />
      <NewGroupContent>
        <Icon />
        <Highlight 
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={setNewGroupName}
          value={newGroupName}
        />

        <Button 
          title="Criar"
          style={{marginTop: 20}}
          onPress={handleNew}
        />
      </NewGroupContent>
    </NewGroupContainer>
  )
}