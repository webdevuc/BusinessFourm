// import { createNavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = createNavigationContainerRef()

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }




import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}