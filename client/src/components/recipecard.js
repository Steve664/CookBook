import { Card, Image, Button } from 'semantic-ui-react';
import react from 'react';

const RecipeCard = ({ title, image, description, onEdit, onDelete }) => {
    return (
        <Card style={{ 'width': '300px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Description>{description}</Card.Description>
                <div style={{ marginTop: '10px' }}>
                    <Button color='blue' onClick={onEdit}>Edit</Button>
                    <Button color='red' style={{ marginLeft: '10px' }} onClick={onDelete}>Delete</Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default RecipeCard