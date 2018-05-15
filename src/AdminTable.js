import React, { Component } from 'react';
import { Table } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment-timezone';

const firebaseConfig = {
    apiKey: 'AIzaSyDhpcbwJdAN9DpJsuvc9ufzG3rNwYlNIdQ',
    authDomain: 'perfect-pitch-7e3e4.firebaseapp.com',
    databaseURL: 'https://perfect-pitch-7e3e4.firebaseio.com',
    projectId: 'perfect-pitch-7e3e4',
    storageBucket: 'perfect-pitch-7e3e4.appspot.com',
    messagingSenderId: '633067185130',
};
firebase.initializeApp(firebaseConfig);

const firestoreSettings = {
    timestampsInSnapshots: true,
};

const firestore = firebase.firestore();
firestore.settings(firestoreSettings);

class AdminTable extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
        this.getStatistics = this.getStatistics.bind(this);
    }

    componentWillMount() {
        // data.push([1, 'test', '2018-05-04 2:15', 365, '2018-05-04 2:15', 36, 56, 25, 80], [1, 'test', '2018-05-04 2:15', 365, '2018-05-04 2:15', 36, 56, 25, 80], [1, 'test', '2018-05-04 2:15', 365, '2018-05-04 2:15', 36, 56, 25, 80])
        // console.log(data)
        this.getStatistics()

    }

    getStatistics() {
        let data = [];
        let stats = firestore.collection('statistics');
        stats.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            this.setState({ data: data });
        });

        console.log("Document data:", data);
        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         let data = [];
        //         data.push(doc.data());
        //         this.setState({ data });
        //         console.log("Document data:", data);
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });
    }

    render() {
        console.log(this.state.data.length)
        return (
            <Table hover responsive>
                <thead style={{backgroundColor: '#333', color: '#ccc'}}>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Date of registration</th>
                        <th>Account lifetime</th>
                        <th>Last active</th>
                        <th>Current streak</th>
                        <th>Max streak</th>
                        <th>Course progress</th>
                        <th>Overall accuracy</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.userId.id}</td>
                        <td>{item.displayName}</td>
                        <td>{moment.utc(item.lastActive.seconds * 1000).tz('Europe/Kiev').format('LLL')}</td>
                        <td>{moment.utc(item.lastActive.seconds * 1000).tz('Europe/Kiev').fromNow(true)}</td>
                        <td>{moment.utc(item.lastActive.seconds * 1000).tz('Europe/Kiev').format('LLL')}</td>
                        <td>{item.currentStreak}</td>
                        <td>{item.maxStreak}</td>
                        <td>{item.courseProgress}</td>
                        <td>{item.overallAccuracy + '%'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default AdminTable;