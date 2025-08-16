function Login(){
    return(

        <div>
            <h2>Login Form</h2>
            <form>
                <div>
                    <label htmlFor>Card Number</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor>Pin:</label>
                    <input type="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;