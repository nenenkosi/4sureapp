import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import './userSearch.css'
import { Form, Card, Image, List, Button, Icon, Divider } from 'semantic-ui-react'
import { getGithubUser, getUserActivities, getRepo } from './services/api'
import { createLocaldb, getLocaldb, deletedLocaldb, updateLocaldb } from './services/lndexeddb';

// import { AllFlights } from './api-interfaces'
// import axios from "../node_modules/axios"


const Usersearch = () => {

    let history = useHistory();


    const [name, setname] = useState('')
    const [login, setlogin] = useState('')
    const [avatar_url, setavatar_url] = useState('')
    const [followers, setfollowers] = useState('')
    const [following, setfollowing] = useState('')
    const [events_url, setevents_url] = useState('')
    const [email, setemail] = useState('')
    const [public_repos, setpublic_repos] = useState('')
    const [public_gists, setpublic_gists] = useState('')
    const [userInput, setuserInput] = useState('')
    const [error, seterror] = useState(false)
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
            getGithubUser(userInput).then((res) => {
                console.log(res);
                console.log(Object.entries(res).length);
                if (Object.entries(res).length === 32) {
                    console.log(Object.entries(res).length);
                    seterror(true)
                    setnoInput(false)
                    //deletedLocaldb()

                    updateData(res)
                    getLocaldb(res, 'userSearch', 1).then((rec) => {
                        console.log(rec);
                        if (rec.length === 0) {
                            console.log(`home add`);
                            createLocaldb(res, 'userSearch', 1).then((rec) => {
                                console.log(rec);
                            })
                        } else {
                            console.log(`home update`);
                            updateLocaldb(res, 'userSearch', 1).then((rec) => {
                                console.log(rec);
                            })
                        }
                    })

                } else {
                    console.log('firsr else');
                    seterror(false)
                    setnoInput(false)
                }

            })
        } else {
            console.log('else');
            seterror(false)
            setnoInput(true)
        }
    }

    // updata state of user data on profile
    const updateData = ({ avatar_url, name, login, followers, following, events_url, email, public_repos, public_gists }) => {
        setname(name)
        setlogin(login)
        setavatar_url(avatar_url)
        setfollowers(followers)
        setfollowing(following)
        setevents_url(events_url)
        setemail(email)
        setpublic_repos(public_repos)
        setpublic_gists(public_gists)
    }
    // navigate to previous page
    const clickBack = () => {
        history.goBack()
    }
    return (
        console.log(error),
        <div>
            <div onClick={clickBack} className="appbar2">
                <div>
                    <Icon style={{ fontSize: 40 }} name='angle left' />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>Github User Search</h3>
                </div>
            </div>

            {noInput ? <div>
                <h1 style={{ textAlign: 'center', color: '#808080', marginTop: 100, marginTop: 100 }}>Please type in a github username </h1>

            </div> : null}
            <div className='serach'>
                <Form onSubmit={searchUser}>
                    <Form.Group widths='equal'>
                        <Form.Input style={{ width: "60vw" }} placeholder='Github user' name='name' onChange={userInputOnchange} />
                        <Form.Button content='Search' />
                    </Form.Group>
                </Form>
            </div>
            {!error && noInput == false ? <h1 style={{ textAlign: 'center', color: '#808080' }}>No user found for that username</h1> : null}
            <div className='cardStyle'>
                {error ? <Card>
                    <Image src={avatar_url} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{login}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{name}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span className='date'>{email}</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra >
                        <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', }}>
                            <span>

                                {followers} followers
                    </span>
                            <span>

                                {following} following
                    </span>
                        </div>
                    </Card.Content>
                    <Card.Content extra >
                        <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', }}>
                            <span>

                                {public_repos} public_repos
                    </span>
                            <span>

                                {public_gists} public gists
                    </span>
                        </div>
                    </Card.Content>

                </Card> : null}
            </div>

        </div>
    );
};

export default Usersearch;