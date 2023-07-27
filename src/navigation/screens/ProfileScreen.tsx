import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetComponent from '../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileCalendar} from '../../components/calendar/ProfileCalendar';
import {ProfileHeader} from './Profile/Header';
import WeeklyGoal from './Profile/WeeklyGoal';
import {ProgressBar} from './Profile/ProgressBar';
import BottomSheetDays from './Profile/BottomSheetDays';
import {LogoutConfirmationModal} from './Profile/LogoutConfirmationModal';

const ProfileScreen = ({navigation}: any) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [activeDays, setActiveDays] = useState(0); // for active days out of selected from bottom sheeet's circular bar
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentFill, setCurrentFill] = useState(0);

  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  const snapPoints = ['25%', '85%'];
  const animationDuration = 1000;

  // Use useRef to store the animation function without triggering re-renders
  const animationRef = useRef<any>();

  const storeActiveDaysInLocalStorage = async (days: number) => {
    try {
      await AsyncStorage.setItem('@activeDays', JSON.stringify(days));
    } catch (error) {
      console.error('Error storing activeDays in local storage:', error);
    }
  };

  const loadActiveDaysFromLocalStorage = async () => {
    try {
      const storedActiveDays = await AsyncStorage.getItem('@activeDays');
      if (storedActiveDays !== null) {
        return JSON.parse(storedActiveDays);
      }
      return null;
    } catch (error) {
      console.error('Error loading activeDays from local storage:', error);
      return null;
    }
  };

  // func to get the number of days that have passed in the current week
  const getDaysPassedInCurrentWeek = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Sunday - 0, Monsday - 1
    return dayOfWeek === 0 ? 7 : dayOfWeek; // if its sunday then it is 7th day
  };

  // Use the calculated activeDays based on the real-world week
  useEffect(() => {
    // Load activeDays from local storage on component mount
    const loadStoredActiveDays = async () => {
      const storedActiveDays = await loadActiveDaysFromLocalStorage();
      if (storedActiveDays !== null) {
        // If activeDays is found in local storage, set it in the state
        setActiveDays(storedActiveDays);
      } else {
        // If activeDays is not found in local storage, set it based on the real-world week
        setActiveDays(getDaysPassedInCurrentWeek());
        // Also, store it in local storage for future use
        storeActiveDaysInLocalStorage(getDaysPassedInCurrentWeek());
      }
    };
    loadStoredActiveDays();
  }, []);

  const animateProgress = (targetFill: number) => {
    let startFill = currentFill;
    const startTime = Date.now();

    const animationFrame = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;

      if (deltaTime >= animationDuration) {
        setCurrentFill(targetFill);
      } else {
        const progress = deltaTime / animationDuration;
        const newFill = Math.floor(
          startFill + progress * (targetFill - startFill),
        );
        setCurrentFill(newFill);
        animationRef.current = requestAnimationFrame(animationFrame);
      }
    };
    animationRef.current = requestAnimationFrame(animationFrame);
  };

  // to not show bottom bar in this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);
  /////////////////////////////

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(prevState => !prevState);
  };

  // const isDaySelected = (day: number) => {
  //   return selectedDays.includes(day);
  // };

  // motivational words
  const motivationalPhrases = [
    "Keep going! You're doing great!",
    "You're on your way to success!",
    'Each day brings you closer to your goal!',
    'Believe in yourself and stay committed!',
    'Superb!',
    'You rock!',
  ];

  const selectRandomMotivationalPhrase = () => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    setMotivationalPhrase(motivationalPhrases[randomIndex]);
  };

  const updateActiveDays = () => {
    setActiveDays(selectedDays.length);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    animateProgress(selectedDays.length);
    setActiveDays(selectedDays.length);
    selectRandomMotivationalPhrase();
  }, [selectedDays]);

  const handleSelectDays = (day: number) => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(selectedDay => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
    updateActiveDays();
  };

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={['#62CBF7', '#6EC3FA', '#6DB9FE', '#6EBAFE']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <ProfileHeader navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.primaryContent}>
            <WeeklyGoal
              selectedDays={selectedDays}
              activeDays={activeDays}
              toggleBottomSheet={toggleBottomSheet}
              CircularProgress={AnimatedCircularProgress}
            />
            <Text style={[styles.firstSectionHeadtext, {paddingBottom: -20}]}>
              Calendar
            </Text>
            <ProfileCalendar activeDays={selectedDays} />
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => {
                setIsLogoutModalVisible(true);
              }}>
              <Text>Log Out</Text>
            </TouchableOpacity>
            <LogoutConfirmationModal
              isVisible={isLogoutModalVisible}
              onClose={() => setIsLogoutModalVisible(false)}
              onLogout={() => {
                setIsLogoutModalVisible(false);
                navigation.navigate('Login');
              }}
            />
          </View>
          <BottomSheetComponent
            isVisible={isBottomSheetVisible}
            toggleBottomSheet={toggleBottomSheet}
            showHandleIndicator={false}
            snapPoints={snapPoints}>
            <View>
              <View>
                <Text style={[styles.firstSectionHeadtext, {paddingTop: 8}]}>
                  Set your weekly goal!
                </Text>
                <Text
                  style={[
                    styles.firstSectionSubHeadtext,
                    {paddingHorizontal: 10},
                  ]}>
                  To keep you motivated, now you can set your personal goal for
                  your week. Edit your goal anytime later.
                </Text>
              </View>
              <ProgressBar selectedDays={selectedDays} />
              <View style={styles.motivationalPhraseContainer}>
                {selectedDays.length > 0 && (
                  <View style={styles.motivsubtext}>
                    <Text style={{fontSize: 18}}>🚀</Text>
                    <Text style={styles.motivationalPhraseText}>
                      {motivationalPhrase}
                    </Text>
                  </View>
                )}
              </View>
              <BottomSheetDays
                selectedDays={selectedDays}
                handleSelectDays={handleSelectDays}
              />
            </View>
            <TouchableOpacity
              onPress={toggleBottomSheet}
              style={styles.continueBtn}>
              <Text style={styles.closeButton}>Done</Text>
            </TouchableOpacity>
          </BottomSheetComponent>
        </ScrollView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
  },
  continueBtn: {
    backgroundColor: '#8F6FFE',
    marginHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
  },
  primaryContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logOutBtn: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
    marginTop: 20,
  },
  firstSectionHeadtext: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 15,
  },
  firstSectionSubHeadtext: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 20,
  },
  motivationalPhraseContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  motivationalPhraseText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
  motivsubtext: {
    alignItems: 'center',
    rowGap: 8,
    position: 'absolute',
    top: -40,
  },
});
