import { AuthenticationResponse } from '@ibenvandeveire/types-authentication';

export type NgxAuthenticationResponseFeature<
	AuthenticationResponseType extends AuthenticationResponse<unknown>,
> = AuthenticationResponseType['session']['features'] extends (infer FeatureKey)[]
	? FeatureKey
	: never;
