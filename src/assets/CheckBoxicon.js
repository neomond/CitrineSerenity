import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCheckBox = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <Path
      stroke="#d8d8d8"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.3 21h5.4c4.5 0 6.3-1.8 6.3-6.3V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3v5.4C3 19.2 4.8 21 9.3 21Z"
    />
  </Svg>
);
export default SvgCheckBox;
