import { Page, Text } from '@geist-ui/core'
import type { NextPage } from 'next'
import { Upload } from '../components/upload.component'

const Home: NextPage = () => {
  return (
    <Page id='dropzone'>
      <Page.Header center mt={5} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Text h1 font={'4rem'} margin={0}>SVG Optimize</Text>
        <Text p font={'1rem'} style={{ color: '#696969' }}>
          optimize | rename | resize your svg files
        </Text>
      </Page.Header >
      <Page.Content style={{ display: 'flex', placeContent: 'center' }}>
        <Upload />
      </Page.Content>
    </Page >
  )
}

export default Home
