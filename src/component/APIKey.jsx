import { Button, Flex, TextField } from '@radix-ui/themes'

const APIKey = props => (
  <Flex width='100%'>
    <TextField.Root color={props.isValid === null ? 'indigo' : props.isValid ? 'green' : 'red'} width='100%' placeholder='API key...' onChange={props.onChange} value={props.value} />
  </Flex>
)

export default APIKey
