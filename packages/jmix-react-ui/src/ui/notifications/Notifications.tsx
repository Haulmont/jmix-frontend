import * as React from 'react';
import { notification as antNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

type NotificationOptions<Options> = Options & {
  type?: NotificationType,
  title?: React.ReactNode,
  description: React.ReactNode,
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

const notifications = {
  show<Options = ArgsProps>({ title, description, type, ...restOptions }: NotificationOptions<Options>) {
    const config = {
      ...restOptions,
      message: title,
      description,
    };

    switch (type) {
      case NotificationType.SUCCESS:
        return antNotification.success(config);
      case NotificationType.ERROR:
        return antNotification.error(config);
      case NotificationType.INFO:
        return antNotification.info(config);
      case NotificationType.WARNING:
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
