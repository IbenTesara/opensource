import { AuthenticationResponse } from '@iben/types-auth';

export type NgxAuthenticationResponseFeature<
	AuthenticationResponseType extends AuthenticationResponse<unknown>,
> = AuthenticationResponseType['session']['features'] extends (infer FeatureKey)[]
	? FeatureKey
	: never;
