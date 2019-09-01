import React from "react";
import "../css/open-iconic-bootstrap.min.css";
import "../css/animate.css";
import "../css/owl.carousel.min.css";
import "../css/owl.theme.default.min.css";
import "../css/magnific-popup.css";
import "../css/aos.css";
import "../css/ionicons.min.css";
import "../css/bootstrap-datepicker.css";
import "../css/jquery.timepicker.css";
import "../css/flaticon.css";
import "../css/icomoon.css";
import "../css/style.css";
import "../css/custom.css";
import Topnews from "./topnews"
import Categories from "./Categories";
import Header_menu_cat from "./Header_menu_cat";
import MainSlider from "./MainSlider";
import Footerpage from "./footerpage";
import _ from 'lodash';
import axios from "axios"
import {Link} from "react-router-dom";

//this is create component with reactcomponent that is called stateful components
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // test: [{id: '1', title: 'ffff'}, {id: '2', title: 'pppppp'}],
            videos: [],
            runvideos: true,
            currentPage: 1,//current page
            todosPerPage: 5,//contents per page

        }
        this.chackandredirect = this.chackandredirect.bind(this);
        this.handleClick = this.handleClick.bind(this);//for pagination button


    }

    handleClick(event) {
        // pagination.event
        console.log(event.target.id)
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    checktoken = () => {
        // check user is already login
        if (localStorage.getItem('logintoken') == null) {

            console.log('empty  token and login false')

        }
        else{
        axios({
            method: 'post',
            url: 'https://admin.ywaymal.com/api/check_token',
            data: {
                token: 'feef'
            }, headers: {
                'Authorization': 'Bearer ' + 'feafea'
            }
        })
            .then(res => {
                console.log('responses from server');
                console.log(res);
                // localStorage.setItem('logintoken',res.data)
                localStorage.setItem('loginstatus', 'yes')
            })
        }

    }

    getVideos() {
        //get data from server
        if (this.state.runvideos) {
            axios({
                method: 'post',
                url: 'https://admin.ywaymal.com/api/getvideos',
                data: {
                    token: 'feef'
                }, headers: {
                    'Authorization': 'Bearer ' + 'feafea'
                }
            })
                .then(res => {
                    console.log('responses from server for videos');
                    this.setState({videos: res.data})
                    console.log(res.data)
                    this.setState({runvideos: false});
                    // localStorage.setItem('logintoken',res.data)
                })
            console.log(this.state.runvideos)
        }
        else {
            console.log(this.state.videos.length)
        }

    }

    componentWillMount() {
        this.checktoken();

    }

    chackandredirect(e) {
        e.preventDefault();

        if (localStorage.getItem('loginstatus') === 'yes') {

            this.getVideos();

        } else {
            return window.location.assign('/');
        }
    }


    render() {
        {
            this.getVideos()
        }
        const videos = this.state.videos;
        const currentPage = this.state.currentPage;
        const todosPerPage = this.state.todosPerPage;

        // Logic for displaying current contents
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        // const currentTodosc = _.chunk(this.state.test,1)
        const currentTodos = videos.slice(indexOfFirstTodo, indexOfLastTodo)

        const renderTodos = currentTodos.map((todo, index) => {


            return (
                <div className=" row blog-entry align-self-stretch">
                    <div className=" col-sm-12 col-md-6">
                        <video style={{width: '100%'}} controls
                               poster={process.env.PUBLIC_URL + '/images/test.GIF'}>
                            <source
                                src={'https://admin.ywaymal.com/backend/admin/videos/' + todo.link}
                                type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                        <div className="col-sm-12">
                            <a href="#">July 03, 2019</a>

                        </div>
                    </div>
                    <div className="text mt-3 text-center col-sm-12 col-md-6"
                         style={{padding: '0px'}}>


                        <h3 className="heading yk_text">{todo.title}</h3>
                        <div className="meta mb-2 sm-12">
                            <div className="">
                                <button type="button" data-id='like_three' id="like_three"
                                        className="btn btn-default btn-circle-yk yk-btn"><i
                                    className="fa fa-thumbs-up"></i></button>
                                <br></br>
                                2k
                            </div>
                            <div className="">
                                <button type="button" data-id='cmt_three' id="cmt_three"
                                        className="btn btn-default btn-circle-yk yk-btn"><i
                                    className="fa fa-comments-o"></i></button>
                                <br></br>
                                3k
                            </div>

                            <div className="">
                                <button type="button" data-id='share_three' id="share_three"
                                        className="btn btn-default btn-circle-yk yk-btn"><i
                                    className="fa fa-share"></i></button>
                                <br></br>
                                300
                            </div>

                            <div className="">
                                <button type="button" data-id='share_three' id="share_three"
                                        className="btn btn-default btn-circle-yk yk-btn"><i
                                    className="fa fa-share"></i></button>
                                <br></br>
                                9k
                            </div>


                        </div>

                        <p>
                            {/*<Link to={'videodetail/'+todo.id} class='btn-custom'>See Detail</Link>*/}
                            <a href="#" class="btn-custom">See Detail</a>
                        </p>
                    </div>
                </div>)
                ;


        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(videos.length / todosPerPage); i++) {

            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === this.state.currentPage) {
                return (
                    <li style={{
                        textAlign: 'center',
                        display: 'inline-block',
                        width: '40px',
                        height: '40px',
                        lineHeight: '40px',
                        borderRadius: '50%',
                        border: '1px solid #ffd637'
                    }}
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >

                        {number}
                    </li>
                )
            } else {
                return (
                    <li style={{
                        textAlign: 'center',
                        display: 'inline-block',
                        width: '40px',
                        height: '40px',
                        lineHeight: '40px',
                        borderRadius: '50%',
                        border: '1px solid #ffd637'
                    }}
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >

                        {number}

                    </li>)
            }
            ;
        });


        return (


                <div onLoad={this.chackandredirect}>
                {/*//test*/}
                {/*header section*/}
                <Header_menu_cat/>

                <div className="row">


                </div>
                {/*end header section*/}
                {/*<div class="col-sm-12">*/}
                {/*KKKKKKKKKKKKKKKK*/}
                {/*<ul>*/}
                {/*{renderTodos}*/}
                {/*</ul>*/}
                {/*<ul id="page-numbers">*/}
                {/*{renderPageNumbers}*/}
                {/*</ul>*/}
                {/*</div>*/}
                {/*body section*/}
                {/*categories section*/}

                <div className="row col-sm-12">

                    <Categories/>
                    {/*end categories section*/}
                    <div className="col-12 col-md-6">
                        {/*Selider section*/}
                        <MainSlider/>
                        {/*end slider section*/}


                        <div className="col-sm-12" style={{borderBottom: '2px solid #f1e6be'}}>&nbsp;</div>

                        <div className="col-sm-12" style={{margin: '22px'}}>
                            <div className="col-sm-12">&nbsp;</div>
                            <div className="col-md-12" style={{textAlign: 'center'}}>
                                <h5 className="mb-1 yk-title-text" style={{textAlign: 'center'}}>Videos </h5>
                            </div>
                            <div className="col-sm-12">&nbsp;</div>

                            <div className="row col-sm-12 d-flex ">
                                {/*// need to creat child component for this section */}


                                <div className="row d-flex ftco-animate">
                                    {/*// need to creat child component for this section */}

                                    {renderTodos}

                                </div>


                            </div>
                            <div className="row col-sm-12 mt-5">
                                <div className="col text-center">
                                    <div className="block-27">
                                        <ul>
                                            <li><a href="#">&lt;</a></li>
                                            {renderPageNumbers}

                                            <li><a href="#">&gt;</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>


                        {/*end for video loop*/}


                    </div>
                    {/*top new section*/}

                    <div className="col-12 col-md-3">
                        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/ads.png'}
                             alt="First slide" style={{height: '300px'}}/>
                        <br></br>
                        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/ads.png'}
                             alt="First slide" style={{height: '300px'}}/>
                        <br></br>


                        {/*//tops news*/}
                        <Topnews/>

                        {/*//tops news*/}

                    </div>

                    {/*end ads section*/}
                </div>
                {/*body section*/}
                <section className="ftco-section">
                    <div className="container col-sm-6">


                    </div>
                </section>
                {/*footer section*/}
                <Footerpage/>
                {/*end footer section*/}

                <div id="ftco-loader" className="show fullscreen">
                    <svg className="circular" width="48px" height="48px">
                        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4"
                                stroke="#eeeeee"/>
                        <circle className="path" cx="24" cy="24" r="22" fill="none" stroke-width="4"
                                stroke-miterlimit="10"
                                stroke="#F96D00"/>
                    </svg>
                </div>
            </div>


        )
            ;
    }
}

export default Homepage;