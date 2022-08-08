export const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });

    if (!res.ok) throw new Error(`Ошибка запроса по адресу ${url}, статус: ${res.status}`);

    return await res.json();
  };
