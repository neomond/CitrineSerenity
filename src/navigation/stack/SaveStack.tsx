import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../screens/SaveScreen';
import MeditationsPlayerScreen from '../screens/Meditations/MeditationsPlayerScreen';

type SaveStackParamList = {
  SaveMain: undefined;
  MeditationsPlayer: undefined;
};

const SaveStack = createNativeStackNavigator<SaveStackParamList>();

export const SaveStackNavigator: React.FC = () => {
  return (
    <SaveStack.Navigator>
      <SaveStack.Screen
        name="SaveMain"
        component={SaveScreen}
        options={{headerShown: false}}
      />
      <SaveStack.Screen
        name="MeditationsPlayer"
        component={MeditationsPlayerScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </SaveStack.Navigator>
  );
};
