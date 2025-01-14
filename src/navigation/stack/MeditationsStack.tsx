import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MeditationsScreen from '../screens/Meditations/MeditationsScreen';
import MeditationsCollectionScreen from '../screens/Meditations/MeditationsCollectionScreen';
import MeditationsPlayerScreen from '../screens/Meditations/MeditationsPlayerScreen';

type MeditationsStackParamList = {
  MeditationsMain: undefined;
  MeditationsCollection: undefined;
  MeditationsPlayer: undefined;
};

const MeditationsStack =
  createNativeStackNavigator<MeditationsStackParamList>();

export const MeditationsStackNavigator: React.FC = () => {
  return (
    <MeditationsStack.Navigator>
      <MeditationsStack.Screen
        name="MeditationsMain"
        component={MeditationsScreen}
        options={{headerShown: false}}
      />
      <MeditationsStack.Screen
        name="MeditationsCollection"
        component={MeditationsCollectionScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          // presentation: 'modal',
          // ...Platform.select({
          //   android: {
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          //   ios: {
          //     presentation: 'modal',
          //   },
          // }),
        }}
      />
      <MeditationsStack.Screen
        name="MeditationsPlayer"
        component={MeditationsPlayerScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </MeditationsStack.Navigator>
  );
};
