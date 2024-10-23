import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActionCreator } from '../hooks/useActionCreators';

const Login = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const { addUser } = useActionCreator();
	const navigate = useNavigate();

	const generateToken = () => {
		let tokenAlp = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

		let token = '';

		for (let i = 0; i < 20; i++) {
			let index = Math.floor(Math.random() * tokenAlp.length);
			token += tokenAlp[index];
		}

		return token;
	};

	const handleLgoin = e => {
		e.preventDefault();
		addUser({ name, email, token: generateToken() });

		navigate('/homepage');
	};

	return (
		<main>
			<h1>Please provide your information to login</h1>
			<form onSubmit={handleLgoin}>
				<section>
					<label>
						name: <input name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
					</label>
				</section>
				<section>
					<label>
						name: <input name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</label>
				</section>
				<button>Login</button>
			</form>
		</main>
	);
};

export default Login;
