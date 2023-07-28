import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryMoodScreen from '../screens/CategoryMoodScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

type HomeStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  DetailsScreen: undefined;
  CategoryMoodScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <HomeStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CategoryMoodScreen"
        component={CategoryMoodScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
