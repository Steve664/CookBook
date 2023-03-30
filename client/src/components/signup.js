import React from 'react'

import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

function SignUp() {

    let condition = true
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='../logo.svg' /> Sign up for an account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' required iconPosition='left' type="email" placeholder='E-mail address' />
                        <Form.Input fluid icon='user' required iconPosition='left' type="name" placeholder='name' />
                        <Form.Input
                            fluid
                            icon='lock'
                            required
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Form.Input
                            fluid
                            icon='lock'
                            required
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
                </Message>

                {condition && <Message
                    success
                    header='Form Completed'
                    content="You're all signed up for the newsletter"
                />}

            </Grid.Column>
        </Grid>
    );
}

export default SignUp