export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);

  // Extract the dynamic parts of the URL
  const pathParts = pathname.split("/").filter(Boolean); // ['prehlidky', 'prehlidka1']

  if (pathParts[0] === "prehlidky") {
    const pageName = pathParts[1];

    // Define content for each dynamic route
    const pageContent = {
      prehlidka1: `<h1>Přehlídka 1</h1><p>This is the first prehlídka page.</p>`,
      prehlidka2: `<h1>Přehlídka 2</h1><p>This is the second prehlídka page.</p>`,
    };

    // Get content for the requested page
    const content =
      pageContent[pageName] ||
      `<h1>Page Not Found</h1><p>Sorry, the page you're looking for does not exist.</p>`;

    return new Response(content, {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response(`<h1>404 Not Found</h1>`, { status: 404 });
}
