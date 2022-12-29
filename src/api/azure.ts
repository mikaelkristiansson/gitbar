import { getClient, ResponseType } from '@tauri-apps/api/http';
import { mapAzureReview, mapAzureUser } from '../lib/formatters';
import type { AuthState, AzureReview, AzureUser, ExtendedAzureUser, Review, User } from '../types';

const base = 'https://dev.azure.com';

/**
 * 
 * @link https://learn.microsoft.com/en-us/rest/api/azure/devops/profile/profiles/get?view=azure-devops-rest-7.0&tabs=HTTP
 */
export const getAzureUserData = async (token: string): Promise<User> => {
    const client = await getClient();
    const response: {
        data: AzureUser;
    } = await client.get('https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=7.0', {
        responseType: ResponseType.JSON,
        headers: {
            Authorization: `Basic ${btoa(`:${token}`)}`,
        },
    });

    const { data } = response as { data: ExtendedAzureUser };

    return mapAzureUser(data);
}

/**
 * 
 * @link https://learn.microsoft.com/en-us/rest/api/azure/devops/git/pull-requests/get-pull-requests-by-project?view=azure-devops-rest-7.0&tabs=HTTP
 */
export const getAzureReviews = async (account: AuthState): Promise<Review> => {
    //token: string, organization: string, project: string, userId: string
    const client = await getClient();
    const response: {
        data: AzureReview
    } = await client.get(`${base}/${account.user.organisation}/${account.user.project}/_apis/git/pullrequests?searchCriteria.reviewerId=${account.user.id}&api-version=7.0`, {
        responseType: ResponseType.JSON,
        headers: {
            Authorization: `Basic ${btoa(`:${account.token}`)}`,
        },
    });

    const { data } = response;
    return mapAzureReview(data);
}