import { GraphQLClient } from 'graphql-request';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;


// Initialize GraphQL client
const graphqlClient = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${space}`,
  {
    headers: {
      Authorization: `Bearer ${access_token}`, // Your access token here
    },
  }
);

const POST_GRAPHQL_FIELDS = `
   sys {
        id
      }
      __typename
      title
      slug
      description
      author
      createdAt
      thumbnail {
        title
        description
        fileName
        url
        width
        height
      }
      body {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              title
            }
          }
        }
    }
  `;

async function fetchGraphQL(query, preview = false, tags = [""]) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${space}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? preview_token
            : access_token
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags },
    }
  ).then((response) => response.json());
}

function extractPostEntries(fetchResponse, caller) {
  const items = fetchResponse?.data?.insightCollection?.items;

  return items;
}

export async function getAllPosts(limit = 3, isDraftMode = false) {
  const blogs = await fetchGraphQL(
    `query {
        insightCollection(where:{slug_exists: true}, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
            items {
              ${POST_GRAPHQL_FIELDS}
            }
          }
        }`,
    isDraftMode
  );

  console.log(blogs, "adasdasdasdasdasdasdasd");
  return extractPostEntries(blogs, "getAllPosts");
}

export async function getAllPostSlugs() {
  try {
    const slugsQuery = `
      query {
        insightCollection(where:{slug_exists: true}) {
          items {
            slug
          }
        }
      }
    `;
    const response = await fetchGraphQL(slugsQuery);
    const items = response?.data?.insightCollection?.items;
    return items.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

export async function getPost(slug, isDraftMode = false) {
  try {
    console.log("Fetching post with slug:", slug, "isDraftMode:", isDraftMode);

    const blog = await fetchGraphQL(
      `query {
        insightCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
            items {
              ${POST_GRAPHQL_FIELDS}
            }
          }
        }`,
      isDraftMode,
      [slug]
    );

    // Log the response to check if data exists
    console.log("GraphQL response:", blog);

    const items = blog?.data?.insightCollection?.items;

    if (!items || items.length === 0) {
      console.error("No items found for slug:", slug);
      return null; // Return null or handle this case as needed
    }

    const insightItem = items[0];

    console.log(insightItem.body, "Fetched body content");
    return insightItem;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null; // Handle errors by returning null or an appropriate response
  }
}
