import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgProfile = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // fill="none"
    {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.95 17.38c-1.572-.813-4.165-1.88-6.95-1.88s-5.378 1.067-6.95 1.88c-1.016.525-1.627 1.555-1.762 2.69L3 22.5h18l-.288-2.43c-.135-1.135-.746-2.165-1.761-2.69ZM12 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
    />
  </Svg>
);
export default SvgProfile;
