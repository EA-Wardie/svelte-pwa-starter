export enum NotificationPermissionStatus {
	Default = 'default',
	Grandted = 'granted',
	Denied = 'denied',
}

export const promptForNotificationPermissions = (
	callback: (permission: NotificationPermissionStatus) => void,
) => {
	Notification.requestPermission().then((permission) => {
		switch (permission) {
			case 'default':
				callback(NotificationPermissionStatus.Default);

				break;
			case 'granted':
				callback(NotificationPermissionStatus.Grandted);

				break;
			case 'denied':
				callback(NotificationPermissionStatus.Denied);

				break;
		}
	});
};
