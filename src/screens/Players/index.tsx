import { useState, useEffect, useRef } from 'react'
import { FlatList, Alert, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ButtonIcon } from '@componentsMap/ButtonIcon'
import { Filter } from '@componentsMap/Filter'
import { Header } from '@componentsMap/Header'
import { Highlight } from '@componentsMap/Highlight'
import { Input } from '@componentsMap/Input'
import { PlayerCard } from '@componentsMap/PlayerCard'
import { ListEmpty } from '@componentsMap/ListEmpty'

import { Form, HeaderList, NumberOfPlayers, PlayersContainer } from './styles'
import { Button } from '@componentsMap/Button'
import { PlayerStorageDTO } from '@storageMap/player/PlayerStorageDTO'
import { AppError } from '@utilsMap/AppError'
import { playerAddByGroup } from '@storageMap/player/playerAddByGroup'
import { playerGetByGroupAdnTeam } from '@storageMap/player/playerGetByGroupAdnTeam'
import { playerRemoveByGroup } from '@storageMap/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storageMap/group/groupRemoveByName'
import { Loading } from '@componentsMap/Loading'

type RouteParams = {
  group: string
}

export function Players(){
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('time a')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const navigation = useNavigation()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleNewPlayer(){
    if(!newPlayerName){
      return Alert.alert('Novo jogador', 'Informe um nome para adicionar a lista.')
    }

    const newPlayer:PlayerStorageDTO = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch (err) {
      if(err instanceof AppError){
        return Alert.alert('Novo jogador', err.message)
      }else{
        return Alert.alert('Novo jogador', 'Não foi possível adicionar o jogador a lista.')
      }
    }
  }

  async function fetchPlayersByTeam(){
    try {
      setIsLoading(true)

      const playersByTeam = await playerGetByGroupAdnTeam(group, team)
      setPlayers(playersByTeam)
    } catch (err) {
      Alert.alert('Jogadores', 'Houve um erro durante o carregamento dos jogadores.')
    }finally{
      setIsLoading(false)
    }
  }

  async function handleDeletePlayer(playerName:string){
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (err) {
      Alert.alert('Remover jogador','Não foi possível remover o jogador.')
    }
  }

  async function groupRemove(){
    try {
      
      await groupRemoveByName(group)
      navigation.navigate('groups')

    } catch (err) {
      Alert.alert('Remover a turma', 'Não foi possível remover a turma')
      
    }
  }

  async function handleDeleteGroup(){
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove()}
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return(
    <PlayersContainer>
      <Header showBackButton/>

      <Highlight 
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleNewPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon='add'
          onPress={handleNewPlayer}  
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['time a', 'time b', 'time c', 'time d']}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            return (
              <Filter 
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )
          }}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> :
        <FlatList 
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            return (
              <PlayerCard 
                name={item.name}
                onRemove={() => handleDeletePlayer(item.name)}
              />
            )
          }}
          ListEmptyComponent={() => {
            return (
              <ListEmpty message='Não há pessoas nesse time.'/>
            )
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 50 },
            players.length === 0 && { flex: 1 }
          ]}
        />
      
      }

      

      <Button 
        title='Remover turma'
        type='SECONDARY'
        onPress={handleDeleteGroup}
      />
    </PlayersContainer>
  )
}