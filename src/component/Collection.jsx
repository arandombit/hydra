import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from '@radix-ui/react-icons'

import ContextMenu from './ContextMenu'

const Collection = props => (
  <Flex direction='column'>
    <Flex align='center' justify='between' width='100%' py='5%'>
      <Flex align='center'>
        { props.isSelected ? <ChevronDownIcon /> : <ChevronRightIcon /> }
        { props.isEditing
          ? <form onSubmit={props.onSubmit}>
              <TextField.Root width='100%' onChange={props.onChange} value={props.value} />
            </form>
          : <ContextMenu type='collection' onNewSession={props.onNewSession} onEdit={props.onEdit} onDelete={props.onDelete}>
              <Text size='4' ml='3%' truncate onClick={props.onSelect}>{ props.title }</Text>
            </ContextMenu>
        }
      </Flex>
      <Flex align='center' justify='center'>
        <Button variant='ghost' onClick={props.onNewSession}><PlusIcon /></Button>
      </Flex>
    </Flex>
    { props.isOpen && <Flex direction='column' width='100%' ml='5%'>{ props.children }</Flex> }
  </Flex>
)

export default Collection
