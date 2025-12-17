import { createContext, hasContext } from 'svelte';

const Status = {
	Online: 'online',
	Offline: 'offline',
} as const;

type Status = (typeof Status)[keyof typeof Status];

export const [getNetworkContext, setNetworkContext] = createContext<Network>();

export class Network {
	private _status: Status = $state(Status.Online);

	constructor() {
		if (navigator.onLine) {
			this.online();
		} else {
			this.offline();
		}

		addEventListener('online', this.online);
		addEventListener('offline', this.offline);
	}

	public static init() {
		setNetworkContext(new Network());
	}

	private online() {
		this._status = Status.Online;
	}

	private offline() {
		this._status = Status.Offline;
	}

	public static getStatus() {
		if (!hasContext(Network)) {
			return Status.Online;
		}

		return getNetworkContext()._status;
	}

	public static isOnline() {
		return this.getStatus() === Status.Online;
	}

	public static isOffline() {
		return this.getStatus() === Status.Offline;
	}
}
