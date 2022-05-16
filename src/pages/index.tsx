import { Link, Page, Text } from '@geist-ui/core'
import type { NextPage } from 'next'
import { Upload } from '../components/upload.component'

const Home: NextPage = () => {
  return (
    <Page id='dropzone' style={{ minHeight: '90vh' }}>
      <Page.Header center mt={5} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Text h1 font={'4rem'} margin={0}>SVG Optimize</Text>
        <Text p font={'1rem'} style={{ color: '#696969' }}>
          optimize | rename | resize your svg files
        </Text>
      </Page.Header >
      <Page.Content style={{ display: 'flex', placeContent: 'center' }}>
        <Upload />
      </Page.Content>
      <Page.Footer style={{ display: 'flex', placeContent: 'center' }}>
        <Text p>Built with ❤️ by <Link href="https://www.sause.dev/" icon color target={'_blank'}>Boring Contributor</Link></Text>
      </Page.Footer>
    </Page >
  )
}

export default Home
