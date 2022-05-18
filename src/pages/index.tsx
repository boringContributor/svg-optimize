import { Grid, Link, Page, Text } from '@geist-ui/core'
import type { NextPage } from 'next'
import { Roadmap } from '../components/roadmap.component'
import { Upload } from '../components/upload.component'

const Home: NextPage = () => {
  return (
    <Page id='dropzone' style={{ minHeight: '90vh' }}>
      <Page.Header center mt={5} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Text h1 font={'4rem'} margin={0}>SVG Optimize</Text>
        <Text p font={'1rem'} style={{ color: '#696969' }}>
          optimize one or multiple svg files with <Link href="https://github.com/svg/svgo" icon color target={'_blank'}>svgo</Link>
        </Text>
      </Page.Header >
      <Page.Content style={{ display: 'flex', placeContent: 'center' }}>
        <Grid.Container gap={1} justify='center'>
          <Grid xs={24} sm={24} justify='center' > <Upload /></Grid>
          <Grid xs={24} sm={24} justify='center'><Roadmap /></Grid>
        </Grid.Container>
      </Page.Content>
      <Page.Footer style={{ display: 'flex', placeContent: 'center' }}>
        <Text p>Built with ❤️ by <Link href="https://www.sause.dev/" icon color target={'_blank'}>Boring Contributor</Link></Text>
      </Page.Footer>
    </Page >
  )
}

export default Home
