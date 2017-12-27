import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'udacityCards:notification';

export const getDeckKeyFromTitle = (title) => title.replace(/ /g, '_');

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
};

function createNotification () {
    return {
        title: 'Psst!',
        body: "You haven't studied today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          if (data === null) {
              Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let notifyAt = new Date();
                        notifyAt.setDate(notifyAt.getDate() + 1);

                        notifyAt.setHours(18);
                        notifyAt.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(
                          createNotification(),
                          {
                              time: notifyAt,
                              repeat: 'day',
                          }
                        );

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
          }
      })
}