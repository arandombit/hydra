import { ContextMenu as C } from '@radix-ui/themes'

const menu = {
  session: [
    { title: 'Edit', event: 'onEdit' },
    { title: 'Delete', event: 'onDelete' }
  ],
  collection: [
    { title: 'New Session', event: 'onNewSession' },
    { title: 'Edit', event: 'onEdit' },
    { title: 'Delete', event: 'onDelete' }
  ]
}

const ContextMenu = props => (
  <C.Root>
    <C.Trigger>{ props.children }</C.Trigger>
      <C.Content>
        { menu[props.type].map(item => <C.Item key={item.event} onClick={props[item.event]}>{ item.title }</C.Item>) }
      </C.Content>
  </C.Root>
)

export default ContextMenu
