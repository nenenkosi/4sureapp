import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './userSearch.css'
import { Form, Card, Image, Icon, } from 'semantic-ui-react'
import { getGithubUser } from './services/api'
import { createLocaldb, getLocaldb, updateLocaldb } from './services/lndexeddb';

const Usersearch = () => {

    let history = useHistory();

    const [name, setname] = useState('')
    const [login, setlogin] = useState('')
    const [avatar_url, setavatar_url] = useState('')
    const [followers, setfollowers] = useState('')
    const [following, setfollowing] = useState('')
    const [email, setemail] = useState('')
    const [public_repos, setpublic_repos] = useState('')
    const [public_gists, setpublic_gists] = useState('')
    const [userInput, setuserInput] = useState('')
    const [error, seterror] = useState(false)
    const [noInput, setnoInput] = useState(true)
    const [update, setupdate] = useState(true)

    // input on change value
    const userInputOnchange = (e) => {
        console.log(e.target.value);
        setuserInput(e.target.value)
    }
    useEffect(() => {
        if (navigator.onLine === true) {
            console.log('navigator.onLine');
            getLocaldb('', 'userSearch', '').then((rec) => {
                console.log(rec[0].data);
                updateData(rec[0].data)
            })
        }
    }, []);
    // search for user and display data or display error
    const searchUser = () => {
        console.log(userInput);
        
        if (userInput) {
            getGithubUser(userInput).then((res) => {
                console.log(res);
                console.log(Object.entries(res).length);
                if (Object.entries(res).length === 32) {
                    console.log(Object.entries(res).length);
                    seterror(true)
                    setnoInput(false)

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
    const updateData = ({ avatar_url, name, login, followers, following, email, public_repos, public_gists }) => {
        setname(name)
        setlogin(login)
        setavatar_url(avatar_url)
        setfollowers(followers)
        setfollowing(following)
        setemail(email)
        setpublic_repos(public_repos)
        setpublic_gists(public_gists)
    }
    // navigate to previous page
    const clickBack = () => {
        history.goBack()
    }
    return (
 
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
                <h1 style={{ textAlign: 'center', color: '#808080', marginTop: 100}}>Please type in a github username </h1>

            </div> : null}
            <div className='serach'>
                <Form onSubmit={searchUser}>
                    <Form.Group widths='equal'>
                        <Form.Input style={{ width: "60vw" }} placeholder='Github user' name='name' onChange={userInputOnchange} />
                        <Form.Button content='Search' />
                    </Form.Group>
                </Form>
            </div>
            {!error && noInput === false ? <h1 style={{ textAlign: 'center', color: '#808080' }}>No user found for that username</h1> : null}
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