import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import HomePage from './HomePage';
import Post from './post';
import Posts from './post';

export const Root = () => {
	return (
		<header>
			<nav>
				<NavLink to='/homepage' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Home
				</NavLink>
				<NavLink to='/posts' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Posts
				</NavLink>
			</nav>
			<Outlet />
		</header>
	);
};

// const fetPost = async ({ request, params }) => {
// 	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
// 	const post = await response.json();
// 	return post;
// };

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: 'homepage',
				element: <HomePage />,
			},

			{
				path: 'posts',
				element: <Posts />,
			},

			{
				path: '/posts/:postId',
				element: <Post />,
				loader: async ({ request, params }) => {
					const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
						signal: request.signal,
					});
					const post = await response.json();
					return post;
				},
			},
		],
	},
]);
