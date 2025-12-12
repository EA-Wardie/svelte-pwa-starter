export enum NetworkStatus {
	Online = 'online',
	Offline = 'offline',
}

export const getNetworkStatus = () => {
	return navigator.onLine ? NetworkStatus.Online : NetworkStatus.Offline;
};

export const onNetworkStatusChanged = (
	callback: (status: NetworkStatus) => void,
) => {
	addEventListener('online', () => {
		callback(NetworkStatus.Online);
	});

	addEventListener('offline', () => {
		callback(NetworkStatus.Offline);
	});
};
