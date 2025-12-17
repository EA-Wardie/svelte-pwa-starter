import { createContext, hasContext } from 'svelte';

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
		this.permission(Permission.Default);
	}

	public static init(): Push {
		const push = new Push();

		setPushContext(push);

		return push;
	}

	public prompt(): void {
		Notification.requestPermission().then((permission) => {
			this.permission(permission);
		});
	}

	private permission(permission: Permission) {
		this._permission = permission;
	}

	public static getPermission(): Permission {
		if (!hasContext(Push)) {
			return Permission.Default;
		}

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
