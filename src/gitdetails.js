import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import './gitdetails.css'



const GitDetail = () => {
    const location = useLocation();

    // Navigation back home
    let history = useHistory();
    const clickBack = () => {
        history.goBack()
    }

    // navigate to UserSearch page    
    const goToUserSearch = () => {
        history.push('/userSearch',)
    }

    const myparam = location.state;
    return (
        <div>
            <div className="appbar1">
                <div onClick={clickBack} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Icon style={{ fontSize: 40 }} name='angle left' />
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Github Details</h3>
                    </div>
                </div>
                <div>
                    <Button onClick={goToUserSearch} className='usersearchbutton' inverted>Search User</Button>
                </div>
            </div>

            <div className="cardStyle">
                <Card style={{ width: '50vw', height: '90%' }}>
                    <Image style={{ height: '50vh', objectFit: 'cover' }} src={myparam.avatar_url} />
                    <Card.Content>
                        <Card.Header>{myparam.login}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{myparam.name}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span className='date'>{myparam.email}</span>
                        </Card.Meta>

                        <Card.Meta>
                            <span className='date'>{myparam.description}</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content  >
                        <div onClick style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', }}>
                            <p>
                                Url link :  <a>{myparam.html_url} </a>
                            </p>
                        </div>
                    </Card.Content>
                    <Card.Content extra >
                        <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', }}>
                            <span>
                                {myparam.followers} followers
                            </span>
                            <span>
                                {myparam.following} following
                            </span>
                        </div>
                    </Card.Content>
                    <Card.Content extra >
                        <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', }}>
                            <span>
                                {myparam.public_repos} public_repos
                            </span>
                            <span>
                                {myparam.public_gists} public gists
                            </span>
                        </div>
                    </Card.Content>

                </Card>
            </div>
        </div>
    );
};

export default GitDetail;