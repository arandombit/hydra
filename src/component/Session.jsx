import { Flex, Text, TextField } from '@radix-ui/themes'

import ContextMenu from './ContextMenu'

const Session = props => (
  <Flex py='5%' px='5%' align='center' justify='start'
    style={{
      backgroundColor: props.selected && 'var(--gray-a2)',
      borderRadius: 'max(var(--radius-4),var(--radius-full))'
    }}>
    { props.isEditing
      ? <form onSubmit={props.onSubmit}>
          <TextField.Root width='100%' onChange={props.onChange} value={props.value} />
        </form>
      : <ContextMenu type='session' onEdit={props.onEdit} onDelete={props.onDelete}>
          <Text size='4' onClick={props.onClick}>{ props.title }</Text>
        </ContextMenu>
    }
  </Flex>
)

export default Session
