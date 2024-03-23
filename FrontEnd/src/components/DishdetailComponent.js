import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Row,
    
} from 'reactstrap';
import '../App.css';

const DishDetailComponent = (props) => {

    const renderDish = (dish) => {
        if (dish) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return null;
        }
    };

    const renderComments = (comments) => {
        if (comments) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {
                            comments.map((comment) => {
                                return (
                                    <li key={comment.id}>
                                    
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="container">
            <Row>
                {renderDish(props.dish)}
                {renderComments(props.dish?.comments)} {/* Use optional chaining to prevent error if props.dish is null */}
            </Row>
        </div>
    )
}

export default DishDetailComponent;
