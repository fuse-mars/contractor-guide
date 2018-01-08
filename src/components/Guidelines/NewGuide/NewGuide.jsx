import * as React from 'react';

import { Button, Feed, Form, Item, Message, TextArea, Comment, Header } from 'semantic-ui-react'


import './NewGuide.css';

class NewGuide extends React.Component {
    render() {
        return (
            <Form success>
                <Form.Field id='newGuide' control={TextArea} label='Guide' placeholder='How to get something done...' />
                <Message info content="You will be able to add steps after submission" />
                <Button>Submit</Button>                
            </Form>
        )
    }
}

class GuideSteps extends React.Component {
    render() {
        const events = [{
            date: 'A few seconds ago',
            image: require('../../../assets/images/avatar/small/helen.jpg'),
            summary: 'How to get your own IBM badge',
        }]



        return (
            <div>
                <Feed events={events} />

                <Item.Group divided>
                    <Item>
                        <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                        <Item.Content verticalAlign='middle'>

                            <Item.Description>
                                <p>Step 1</p>
                                <p>
                                    Ask Joyce to put in a request for you
                    </p>
                            </Item.Description>

                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Description>
                                <p>Step 2</p>
                                <p>
                                    Go to the IBM main office at 590 Madison Ave, New York, NY 10022
                    </p>
                            </Item.Description>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Description>
                                <p>Step 3</p>
                                <p>
                                    Tell security guard that you are there to get a new IBM id
                    </p>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Description>
                                <p>Step 4</p>
                                <Form success>
                                    <Form.Field id='guideStep' control={TextArea} placeholder='Add a step here...' />
                                    <Button labelPosition='left' icon="edit">add</Button>
                                </Form>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>

        )
    }
}



export default NewGuide;