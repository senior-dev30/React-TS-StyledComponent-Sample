import colors, { colorsObject } from './colors'
import images, { imagesObject } from './images'
import metrics, { metricsObject } from './metrics'
import fonts, { fontObject } from './fonts'

export interface ThemeInterface {
  colors: colorsObject
  images: imagesObject
  metrics: metricsObject
  fonts: fontObject
}

export default {
  colors,
  images,
  metrics,
  fonts,
}
