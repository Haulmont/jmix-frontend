import { notifications } from "./Notifications";

jest.useFakeTimers();

describe('notifications API', () => {

  it('send method', async () => {
    notifications.show({
      title: "testedNotificationTitle",
      description: "testedNotificationMessage",
      key: "testedNotification",
      prefixCls: "tested"
    });
    await Promise.resolve();
    const notificationsCount = document.querySelectorAll('.tested-notice').length;
    expect(notificationsCount).toEqual(1);
  });

  it('close method', async () => {
    let firstTestedNotificationCount: number;
    let secondTestedNotificationCount: number;

    notifications.show({
      title: "firstTestedNotificationTitle",
      description: "firstTestedNotificationMessage",
      key: '1',
      duration: null,
      prefixCls: "first-tested"
    });
    notifications.show({
      title: "secondTestedNotificationTitle",
      description: "secondTestedNotificationMessage",
      key: '2',
      duration: null,
      prefixCls: "second-tested"
    });
    await Promise.resolve();
    firstTestedNotificationCount = document.querySelectorAll('.first-tested-notice').length;
    expect(firstTestedNotificationCount).toEqual(1);
    secondTestedNotificationCount = document.querySelectorAll('.second-tested-notice').length;
    expect(secondTestedNotificationCount).toEqual(1);

    notifications.close('1');
    await Promise.resolve();
    firstTestedNotificationCount = document.querySelectorAll('.first-tested-notice').length;
    expect(firstTestedNotificationCount).toEqual(0);

    notifications.close('2');
    await Promise.resolve();
    secondTestedNotificationCount = document.querySelectorAll('.second-tested-notice').length;
    expect(secondTestedNotificationCount).toEqual(0);
  });

  it('closeAll method', async () => {
    let firstTestedNotificationCount: number;
    let secondTestedNotificationCount: number;

    notifications.show({
      title: "firstTestedNotificationTitle",
      description: "firstTestedNotificationMessage",
      key: '1',
      duration: null,
      prefixCls: "first-tested"
    });
    notifications.show({
      title: "secondTestedNotificationTitle",
      description: "secondTestedNotificationMessage",
      key: '2',
      duration: null,
      prefixCls: "second-tested"
    });
    await Promise.resolve();
    firstTestedNotificationCount = document.querySelectorAll('.first-tested-notice').length;
    expect(firstTestedNotificationCount).toEqual(1);
    secondTestedNotificationCount = document.querySelectorAll('.second-tested-notice').length;
    expect(secondTestedNotificationCount).toEqual(1);

    notifications.closeAll();
    await Promise.resolve();
    firstTestedNotificationCount = document.querySelectorAll('.first-tested-notice').length;
    expect(firstTestedNotificationCount).toEqual(0);
    secondTestedNotificationCount = document.querySelectorAll('.second-tested-notice').length;
    expect(secondTestedNotificationCount).toEqual(0);
  });

})
