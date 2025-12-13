import { createContext } from 'svelte';

const Permission = {
	Default: 'default',
	Granted: 'granted',
	Denied: 'denied',
} as const;

type Permission = (typeof Permission)[keyof typeof Permission];

export const [getPushContext, setPushContext] = createContext<Push>();

export class Push {
	private _permission: Permission = $state(Permission.Default);

	constructor() {
		Notification.requestPermission().then((permission) => {
			this.permission(permission);
		});
	}

	public static init() {
		setPushContext(new Push());
	}

	private permission(permission: Permission) {
		this._permission = permission;
	}

	public static getPermission() {
		return getPushContext()._permission;
	}

	public static isDefault() {
		return this.getPermission() === Permission.Default;
	}

	public static isGranted() {
		return this.getPermission() === Permission.Granted;
	}

	public static isDenied() {
		return this.getPermission() === Permission.Denied;
	}
}
