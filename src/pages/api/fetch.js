// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fetchPkmns = async (_, cursor) => {
  const url = cursor
    ? cursor
    : "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  const res = await fetch(url);
  return res.json();
};

const fetchStats = async (_, url) => {
  const res = await fetch(url);
  return res.json();
};

export { fetchPkmns, fetchStats };
