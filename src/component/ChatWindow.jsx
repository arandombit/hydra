import { Card, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import Markdown from './Markdown'

const ChatWindow = props => (
  <Flex direction='column' height='100%' width='100%' px='2%' justify='space-between'>
    { props.session &&
      <>
        <ScrollArea my='3%'>
          <Flex direction='column' gap='3' pb='1.5%' height='100%'>
            <Text size='4'>{ props.session.title }</Text>
            { props.session.messages.map(m => <Card key={m.content}><Markdown>{ m.content }</Markdown></Card>) }
          </Flex>
        </ScrollArea>
        <form onSubmit={props.onSubmit}>
          <TextField.Root width='100%' placeholder='Message' onChange={props.onChange} value={props.value} />
        </form>
      </>
    }
  </Flex>
)

export default ChatWindow
