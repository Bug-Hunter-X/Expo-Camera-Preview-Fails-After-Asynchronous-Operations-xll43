The solution involves using async/await and properly managing the camera lifecycle.  Instead of starting asynchronous operations directly, we use promises and await their completion before manipulating the camera.  This ensures the camera is ready before any changes are made.
```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

async function takePicture(camera) {
  await camera.takePictureAsync();
}

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraRef, setCameraRef] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // Placeholder
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => setCameraRef(ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
            onPress={async () => {
              if (cameraRef) {
                await takePicture(cameraRef);
              }
            }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
```