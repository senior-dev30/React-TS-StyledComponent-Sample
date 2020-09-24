export interface colorsObject {
  [key: string]: string
}

const colors: colorsObject = {
  // Base app colors
  black: '#000000',
  offBlack: '#030303',
  white: '#FFFFFF',
  offWhite: '#EEEEEE',
  bluishWhite: '#F5F9FC',
  gray: '#ADB8C6',
  lightGray: '#D8DCE2',
  darkGray: '#3A465E',
  blueGray: '#EAEEF5',
  blue: '#3197D3',
  lightBlue: '#2996D5',
  darkBlue: '#236E9B',
  navy: '#1C587C',
  transparent: 'rgba(0,0,0,0)',
  // Accent colors
  aquamarine: '#CAF6EC',
  aquamarineDark: '#2DBBCA',
  grassGreen: '#DBF3C2',
  lightSlate: '#C8DDF6',
  magenta: '#F43C6F',
  operating: '#B8E986',
  idling: '#F2BB7D',
  engineOff: '#F44E63',
}

export default colors
