import type { GithubReview, GithubUser, AzureReview, Review, User, ExtendedAzureUser } from "../types";

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getFormattedDate(
  date: Date,
  preformattedDate: boolean | string = false,
  hideYear = false
) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes: string | number = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (preformattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${preformattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export function timeAgo(dateParam: string) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}

export function mapGithubUser(data: GithubUser): User {
  return {
    name: data.login,
    id: data.id,
    url: data.html_url,
    avatar: data.avatar_url,
    organisation: data.company
  }
}

export function mapAzureUser(data: ExtendedAzureUser): User {
  return {
    name: data.displayName,
    id: data.id,
    organisation: data.organisation,
    project: data.project
  }
}

export function mapGithubReview(data: GithubReview): Review {
  return {
    count: data.issueCount,
    issues: data.edges.map(e => ({
      repository: e.node.repository.nameWithOwner,
      author: e.node.author.login,
      createdAt: e.node.createdAt,
      number: e.node.number,
      url: e.node.url,
      title: e.node.title
    }))
  }
}
export function mapAzureReview(data: AzureReview): Review {
  return {
    count: data.count,
    issues: data.value.map(e => ({
      repository: `${e.repository.project}-${e.repository.name}`,
      author: e.createdBy.displayName,
      createdAt: e.creationDate,
      number: e.pullRequestId,
      url: e.url,
      title: e.title
    }))
  }
}