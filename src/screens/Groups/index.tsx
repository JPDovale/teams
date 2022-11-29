import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { getAllGroups } from "@storageMap/group/getAllGroups";

import { GroupCard } from "@componentsMap/GroupCard";
import { Header } from "@componentsMap/Header";
import { Highlight } from "@componentsMap/Highlight";

import { Container } from "./styles";
import { ListEmpty } from "@componentsMap/ListEmpty";
import { Button } from "@componentsMap/Button";
import { Loading } from "@componentsMap/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await getAllGroups()

      setGroups(data)
    } catch (err) {
      console.log(err);
    }finally{
      setIsLoading(false)
    }
  }

  function handleOpenGroup(groupName: string) {
    navigation.navigate('players', {group: groupName})
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading? <Loading /> : 
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1}}
          ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma" />}
        />
      }

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
