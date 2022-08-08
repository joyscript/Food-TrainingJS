export const fetchData = async (url, method, data) => {
  let res;

  if (method == 'POST') {
    res = await fetch(url, {
      method: method,
      body: data,
      headers: { 'Content-type': 'application/json' },
    });
  } else {
    res = await fetch(url);
  }

  if (!res.ok) throw new Error(`Ошибка запроса по адресу ${url}, статус: ${res.status}`);

  return await res.json();
};
