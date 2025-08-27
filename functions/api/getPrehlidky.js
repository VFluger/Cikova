const projectId = "djr0842l";
const dataset = "production";

export async function onRequest(context) {
  const query = encodeURIComponent(`*[_type == "prehlidka"] {
    title,
    year,
    description,
    link,
    IndexOfPreview,
    photos[]{
      title,
      description,
      "url": image.asset->url,
    }
  }`);

  const url = `https://${projectId}.api.sanity.io/v2025-08-01/data/query/${dataset}?query=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data.result);

  return new Response(data.result);
}
