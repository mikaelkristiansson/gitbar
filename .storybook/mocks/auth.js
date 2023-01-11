import { writable } from 'svelte/store';

const account = {
    token: 'asd123',
    hostname: 'github.com',
    user: {
        login: 'mikael.kristiansson',
        name: 'mikael.kristiansson',
        id: 1,
        avatar_url: 'https://placeimg.com/360/360/people',
    },
};

export const defaultSettings = {
    openAtStartup: false,
    fetchInterval: 30000,
};

export const auth = writable({
    signIn: () => {},
    signOut: () => {},
    account: account,
    settings: defaultSettings,
    updateSettings: () => {},
});
