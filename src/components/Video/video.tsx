import React from 'react'
import { MediaContextProvider, Media } from 'theme/media'
import { Video } from './desktop'
import { MobileVideo } from './mobile'
import { TabletVideo } from './table'

const App = () => (
  <MediaContextProvider disableDynamicMediaQueries>
    <Media at="sm">
      <MobileVideo />
    </Media>
    <Media at="md">
      <TabletVideo />
    </Media>
    <Media greaterThanOrEqual="lg">
      <Video />
    </Media>
  </MediaContextProvider>
)

export default App
