import { useState } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick(event) {
        event.preventDefault();
        // console.log(handleClick);
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();
            setSuccessMessage(result.message);
            // const json = await
            //     response.json();
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <section>
            <h2>Authenticate!</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </section>
    )
}




//starting on Authenticate Component