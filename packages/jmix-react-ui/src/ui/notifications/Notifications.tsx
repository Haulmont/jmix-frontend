import * as React from 'react';
import { notification as antNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

type NotificationOptions<Options> = Options & {
  type?: string,
  title: React.ReactNode,
  message: React.ReactNode,
}

enum NotificationTypes {
  SUCCES = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

const notifications = {
  send<Options = ArgsProps>({ title, message, type, ...restOptions }: NotificationOptions<Options>) {
    const config = {
      ...restOptions,
      message: title,
      description: message,
    };

    switch (type) {
      case NotificationTypes.SUCCES:
        return antNotification.success(config);
      case NotificationTypes.ERROR:
        return antNotification.error(config);
      case NotificationTypes.INFO:
        return antNotification.info(config);
      case NotificationTypes.WARNING:
        return antNotification.warning(config);
      default:
        return antNotification.open(config);
    }
  },

  closeAll: () => {
    antNotification.destroy();
  },

  close: (key: string) => {
    antNotification.close(key);
  }
}

export { notifications };
