import { Button, Flex, TextField } from '@radix-ui/themes'

const APIKey = props => (
  <Flex width='100%'>
    <TextField.Root width='100%' placeholder='API key...' onChange={props.onChange} value={props.value} />
  </Flex>
)

export default APIKey
