<script lang="ts">
    let method = $state("login");  
</script>

<div class="card">
    {#if method === "login"}
        <h1>Login</h1>
        <p>Log in to your account</p>
        <form action="?/login" class="form" method="POST">
            <div class="form__container">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form__container">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <button type="button" onclick={() => { method = "register"; }}>Don't have an account? Register here</button>
    {:else if method === "register"}
        <h1>Register</h1>
        <p>Create an account</p>
        <form action="?/register" class="form" method="POST">
            <div class="form__container">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form__container">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" required>
            </div>
            <button type="submit">Register</button>
        </form>
        <button type="button" onclick={() => { method = "login"; }}>Already have an account? Login here</button>
    {/if}
</div>

<style lang="postcss">

    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        width: 100%;
        background-color: #ffffff;
        h1{
            margin-bottom: 0.5rem;
        }
    }
    .form{

        .form__container{
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;


            label{
                margin-bottom: 0.5rem;
            }

            input{
                padding: 0.5rem;
                border: 1px solid #333;
                border-radius: 0.25rem;
                outline: none;

            }
            input:focus{
                border-color: #007bff !important;
            }
        }

        button{
            padding: 0.5rem;
            border: none;
            border-radius: 0.25rem;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            outline: none;
        }
    }

</style>