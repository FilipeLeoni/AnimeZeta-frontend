export async function fetchWrapper(url: string) {
  const data = await fetch(`${process.env.JIKAN_URL}${url}`);
  const result = await data.json();
  return result;
}

export async function fetchApi<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`${process.env.API_URL}${input}`, init);
  const result = await data.json();
  return result as T;
}
