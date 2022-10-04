import { useState, createContext, useContext } from 'react';
function useNotificationHook () {
  const [notification, setNotif] = useState(null);
  return {
    notification,
    setNotification: (text) => {
      setNotif(text);
      setTimeout(() => {
        setNotif(null)
      }, 2500)
    }
  }
}
const defaults = null
/* The context itself */
const NotificationContext = createContext(defaults);
/* The provider lets you change the provided components */
const NotificaitonProvider = ({ children }) => {
  const notification = useNotificationHook();
  return (
    <NotificationContext.Provider value={notification}>{children}</NotificationContext.Provider>
  )
};
/* A custom hook to get access to the provided components */
export const useNotification = () => useContext(NotificationContext);
/* The components provider itself */
export default NotificaitonProvider;