import React, { useState, } from "react";
import { useHistory } from "react-router-dom";
import './home.css'
import { Form, List, Button, Divider } from 'semantic-ui-react'
import { getUserActivities, getRepo } from './services/api'
import { createLocaldb, getLocaldb, deletedLocaldb, updateLocaldb } from './services/lndexeddb';

// import { AllFlights } from './api-interfaces'
// import axios from "../node_modules/axios"


const HomePage = () => {

    let history = useHistory();

    const [userInput, setuserInput] = useState('')
    const [error, seterror] = useState()
    const [noInput, setnoInput] = useState(true)
    const [activities, setActivities] = useState([])

    // input on change value
    const userInputOnchange = (e) => {
        console.log(e.target.value);
        setuserInput(e.target.value)
    }

    // search for user and display data or display error
    const searchUser = () => {
        console.log(userInput);
        setActivities([])
        if (userInput) {
            getUserActivities(userInput).then((res) => {
                console.log(res);

                if (typeof res != "undefined" && res != null && res.length != null && res.length > 0) {
                    setActivities(res)
                    seterror(null)
                    setnoInput(false)
                    // deletedLocaldb()

                    getLocaldb(res, 'userActivities', 0).then((rec) => {
                        console.log(rec);
                        if (rec.length === 0) {
                            console.log(`home add`);
                            createLocaldb(res, 'userActivities', 0).then((rec) => {
                                console.log(rec);
                            })
                        } else {
                            console.log(`home update`);
                            updateLocaldb(res, 'userActivities', 0).then((rec) => {
                                console.log(rec);
                            })
                        }
                    })
                } else {
                    console.log('firsr else');
                    seterror('error')
                    setnoInput(false)
                }

            })
        } else {
            console.log('else');
            setnoInput(true)
        }
    }

    // navigate to get Details page with param from the use activities from the home page
    const click = (url) => {
        getRepo(url).then((res) => {
            console.log(res);
            history.push('/gitdetails', res)
        })
    }

    // navigate to UserSearch page
    const goToUserSearch = () => {
        history.push('/userSearch',)
    }
    return (

        <div>
            <div className="appbar">
                <div>
                    <h3 style={{ textAlign: 'center' }}>Github User Activities Search</h3>
                </div>
                <div>
                    <Button onClick={goToUserSearch} className='usersearchbutton' inverted>Search User</Button>
                </div>
            </div>

            {noInput ? <div>
                <h1 style={{ textAlign: 'center', color: '#808080', marginTop: 100, marginTop: 100 }}>Please type in a github username to see all activities</h1>

            </div> : null}
            <div className='serach'>
                <Form onSubmit={searchUser}>
                    <Form.Group widths='equal'>
                        <Form.Input style={{ width: "60vw" }} placeholder='Github user' name='name' onChange={userInputOnchange} />
                        <Form.Button content='Search' />
                    </Form.Group>
                </Form>
            </div>
            {error ? <h1 style={{ textAlign: 'center', color: '#808080' }}>No user found for that username</h1> : null}

            {activities.map((item, i) => {

                return <div> {!error ? <div key={i} className='listItems' > <List key={i} divided relaxed>

                    <List.Item key={i}
                        onClick={() => {
                            click(item.repo.url)
                        }}>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{item.repo.name}</List.Header>
                            <List.Content floated='right'>
                                <a>{item.type}</a>
                            </List.Content>
                            <List.Description as='a'>Updated {item.created_at.slice(0, 10)}</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                    <Divider fitted />
                </div> : null}
                </div>
            })}

        </div>
    );
};

export default HomePage;