// Import your Client Component
import HomePage from './home-page';

async function getPosts() {
  const posts = ['12', '123']
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return <div>dawwad</div>;
}