import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";

function LandingPage() {
    return (
        <div style={{marginTop : "180px"}}>
        <Container>
            <Header as="h1" textAlign="center">
                Welcome to the Recipe App!
            </Header>
            <p>
                This app allows you to browse, create, and share recipes with others.
                Whether you're looking for inspiration or want to showcase your cooking
                skills, our community of foodies is here to help.
            </p>
            <Button color="teal" as={Link} to="/recipes">
                Get started
            </Button>
        </Container>
    </div>
    );
}

export default LandingPage;
