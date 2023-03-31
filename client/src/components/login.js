import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleLogin = async () => {
        // make API call to authenticate user
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        // set session cookie
        Cookies.set('token', data.token);

        navigate('/dashboard');
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='../logo.svg' /> Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleLogin}>
                    <Segment stacked>
                        <Form.Input name='email' value={inputs.email || ""} onChange={handleChange} fluid icon='user' iconPosition='left' placeholder='E-mail address' />

                        <Form.Input
                            fluid
                            name='password'
                            onChange={handleChange}
                            icon='lock'
                            iconPosition='left'
                            value={inputs.password || ""}
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to='/signup'>Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login
