import {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';

export const useMessage = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (message) {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }, [message]);

  return {message, setMessage};
};
