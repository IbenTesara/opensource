import { AuthenticatedUserSession, AuthenticationResponse } from '@ibenvandeveire/types-authentication';
/**
 * Returns a mock authentication response
 */
export const NgxAuthenticationResponseMock: AuthenticationResponse<
	{ name: string },
	AuthenticatedUserSession<'A' | 'B', 'Admin' | 'User'>,
	{ requestPassword: boolean }
> = {
	user: {
		name: 'Test',
	},
	session: {
		features: ['A'],
		permissions: ['User'],
	},
	metadata: {
		requestPassword: true,
	},
};
