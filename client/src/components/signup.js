import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

function SignUp() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async () => {

        const response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        navigate('/');
    }


    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='https://cdn.dribbble.com/users/2425253/screenshots/15276005/media/96f7e2bd3cc1089bcbf0eb26d74b4a08.jpg?compress=1&resize=1000x750&vertical=top' /> Sign up for an account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            required
                            name="email"
                            onChange={handleChange}
                            iconPosition='left' type="email" placeholder='E-mail address' />
                        <Form.Input
                            fluid icon='user'
                            name="name"
                            onChange={handleChange}
                            required iconPosition='left'
                            type="text"
                            placeholder='name' />
                        <Form.Input
                            fluid
                            icon='lock'
                            required
                            name="password"
                            onChange={handleChange}
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Form.Input
                            fluid
                            icon='lock'
                            required
                            name="password_confirmation"
                            onChange={handleChange}
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                        />

                        <Button color='yellow' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already signed up<Link to='/'> Login Here</Link> instead.
                </Message>



            </Grid.Column>
        </Grid>
    );
}

export default SignUp