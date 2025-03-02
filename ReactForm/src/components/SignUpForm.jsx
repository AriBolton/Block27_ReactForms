import { useState } from "react"

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!username.includes("@")) {
            setError("Please include @ in username");
            return
        }

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const json = await response.json();
            if (response.ok) {
                setUsername('');
                setPassword('');
                setToken(json.token);
            } else {
                setError(`Oh no, something went wrong! ${json.message}`);
            }
            console.log(json);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="form">
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </label>
                <p>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </p>
                <p>
                    <button> Submit</button>
                </p>

            </form>
        </section>
    )

};