/**
 * Returns a mock version of the `NgxBroadcastChannelService`
 *
 * @param testFunction - The test function we wish to use
 */
export const NgxBroadcastChannelServiceMock = (testFunction: Function) => ({
	initChannel: testFunction,
	closeChannel: testFunction,
	postMessage: testFunction,
	selectChannelMessages: testFunction,
	selectChannelMessageErrors: testFunction,
});
