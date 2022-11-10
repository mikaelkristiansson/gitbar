interface RejectError extends Error {
  response: object;
}

interface ResponseData {
  data: { message: string };
}

function createError(message: string, response: { statusText: string }, json: { message: string }): RejectError {
  const error = new Error(message) as RejectError;
  const errorResponse: ResponseData = Object.assign(response, {
    data: {
      statusText: response.statusText,
      message: (json && json.message) || response.statusText
    }
  });
  error.response = errorResponse;
  return error;
}

function isStringObject(text: string) {
  if (typeof text !== 'string') {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Performs a http request
 */
export async function client(
  endpoint: string,
  { body, ...customConfig }: { body?: object; method: string },
  headers = {}
) {
  const config = {
    ...customConfig,
    headers: {
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'content-type': 'application/json',
      ...headers
    },
    body: ''
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  if (response.ok) {
    const text = await response.text();
    const json = text === '' ? {} : JSON.parse(text);
    return json;
  }
  const text = await response.text();
  let json = { message: text.trim() };
  if (isStringObject(text)) {
    json = JSON.parse(text);
  }
  return Promise.reject(createError(`Request failed with status code ${String(response.status)}`, response, json));
}

export const transport = {
  /**
   * Performs a get request
   */
  get(endpoint: string, headers?: any) {
    return client(endpoint, { method: 'GET', ...headers });
  },

  /**
   * Performs a post request
   */
  post(endpoint: string, data: object) {
    return client(endpoint, { method: 'POST', body: { ...data } });
  },

  /**
   * Performs a put request
   */
  put(endpoint: string, data: object) {
    return client(endpoint, { method: 'PUT', body: { ...data } });
  },

  /**
   * Performs a patch request
   */
  patch(endpoint: string, data: object) {
    return client(endpoint, { method: 'PATCH', body: { ...data } });
  },

  /**
   * Performs a delete request
   */
  delete(endpoint: string) {
    return client(endpoint, { method: 'DELETE' });
  }
};
