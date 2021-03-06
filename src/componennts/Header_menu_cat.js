import React from 'react';
// import "../css/open-iconic-bootstrap.min.css";
import "../css/animate.css";
import "../css/owl.carousel.min.css";
import "../css/owl.theme.default.min.css";
import "../css/magnific-popup.css";
import "../css/aos.css";
import "../css/ionicons.min.css";
// import "../css/bootstrap-datepicker.css";
import "../css/jquery.timepicker.css";
import "../css/flaticon.css";
import "../css/icomoon.css";
import "../css/style.css";
import axios from "axios";
import apiurl from "../helpers/apiurl";

class Header_menu_cat extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cities: [],
            ssts: [],
            connumbers: [],
            cons: [],
            names: [],
        };
        this.handlesearch = this.handlesearch.bind(this);
        this.getwhencitychange = this.getwhencitychange.bind(this);
        this.getwhenconchange = this.getwhenconchange.bind(this);
        this.getnames = this.getnames.bind(this);
        this.getwhenstatechange = this.getwhenstatechange.bind(this);
        this.getwhenconnumberschange = this.getwhenconnumberschange.bind(this);


    }

    componentWillMount() {
        var id = '';
        this.getcities(id);
        this.getnames(id);
        this.getconnumbers(id);
        this.getcons(id);
        this.getstates(id);

        window.$(document).ready(function () {
            window.$(".uni").click(function () {
                window.$('.changeMe').css("font-family", "Masterpiece Uni Sans,Myanmar3");


                console.log('font change');
            });
            window.$(".zaw").click(function () {
                window.$('.changeMe').css("font-family", "Zawgyi-One");

                console.log('font change');

            });
        })


    }


    //tem hidden
    handletownships() {
        console.log('handle ts fire');
        console.log(this.refs.ts.value);
        return axios({
            method: 'post',
            url: apiurl + '/api/getwhilecityselected',
            data: {
                cid: this.refs.ts.value,
                sid: 'empty',
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            });
    }

    //temp hidden this

    //get cities
    getcities(id) {
        return axios({
            method: 'post',
            url: apiurl + '/api/getcities' + id,
            data: {
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log('responses from server for cities');
                this.setState({cities: res.data});
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            })
        console.log(this.state.runvideos);
    }

    //get cities
    //get staes
    getstates(id) {
        return axios({
            method: 'post',
            url: apiurl + '/api/getstates' + id,
            data: {
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log('responses from server for cities');
                this.setState({ssts: res.data});
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            })
        console.log(this.state.runvideos);
    }

    //get cities

    //get names
    getnames(id) {
        return axios({
            method: 'post',
            url: apiurl + '/api/getnames' + id,
            data: {
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log('responses from server for names');
                this.setState({names: res.data});
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            })
        console.log(this.state.runvideos);
    }

    //get cities
    //get cities
    getconnumbers(id) {
        console.log('get connumberr fire');
        return axios({
            method: 'post',
            url: apiurl + '/api/getconnumbers' + id,
            data: {
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log('responses from server for con no ');
                this.setState({connumbers: res.data});
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            })
        console.log(this.state.runvideos);
    }

    getcons(id) {
        console.log('get cons fire');
        return axios({
            method: 'post',
            url: apiurl + '/api/getcons' + id,
            data: {
                token: localStorage.getItem('logintoken')
            }, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
            }
        })
            .then(res => {
                console.log('responses from server for cons');
                this.setState({cons: res.data});
                console.log(res.data);
                // localStorage.setItem('logintoken',res.data)
            })
        console.log(this.state.runvideos);
    }

    getwhencitychange(){
        console.log("while cities is selected");
        if(this.refs.cities.value !== 'none'){
            if(this.refs.cities.value.includes('c')){
                return axios({
                    method: 'post',
                    url: apiurl + '/api/getwhilecityselected',
                    data: {
                        cid: this.refs.cities.value.substring(1),
                        sid:'empty',
                    }, headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        this.setState({'cons':res.data.cons});
                        this.setState({'connumbers':res.data.con_numbers});
                        this.setState({'names':res.data.nn});
                        // localStorage.setItem('logintoken',res.data)
                    })
            }else{
                return axios({
                    method: 'post',
                    url: apiurl + '/api/getwhilecityselected',
                    data: {
                        cid: 'empty',
                        sid:this.refs.cities.value.substring(1),
                    }, headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        this.setState({'cons':res.data.cons});
                        this.setState({'connumbers':res.data.con_numbers});
                        this.setState({'names':res.data.nn});
                        // localStorage.setItem('logintoken',res.data)
                    })            }
            }
           else{
            var id='';
            this.getcities(id);
            this.getconnumbers(id);
            this.getcons(id);
            this.getnames(id);
            this.getstates(id);

        }

    }


    getwhenstatechange() {
        console.log("while State is selected");
        if (this.refs.states.value !== 'none') {
            return axios({
                method: 'post',
                url: apiurl + '/api/getwhilecityselected',
                data: {
                    cid: 'empty',
                    sid: this.refs.states.value,
                }, headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
                }
            })
                .then(res => {
                    console.log(res.data);
                    console.log('responses from server for states');
                    this.refs.cities.value = 'none';

                    this.setState({'cons': res.data.cons});
                    var id = '';
                    this.getcities(id);
                    this.setState({'connumbers': res.data.con_numbers});
                    this.setState({'names': res.data.nn});
                    // localStorage.setItem('logintoken',res.data)
                })
        } else {
            let id = '';
            this.getcities(id);
            this.getconnumbers(id);
            this.getcons(id);
            this.getnames(id);
            this.getstates(id);

        }

    }

    getwhenconnumberschange() {
        console.log("while connumber is selected");
        if (this.refs.connumbers.value !== 'none') {
            return axios({
                method: 'post',
                url: apiurl + '/api/getwhenconnumberschange',
                data: {
                    cnid: this.refs.connumbers.value
                }, headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({'cons': res.data.cons});
                    this.setState({'names': res.data.nn});

                    // localStorage.setItem('logintoken',res.data)
                })
        } else {
            let id = '';
            this.getcities(id);
            this.getcons(id);
            this.getnames(id);
            this.getstates(id);


        }

    }

    getwhenconchange() {
        console.log("while con is selected");
        if (this.refs.cons.value !== 'none') {
            return axios({
                method: 'post',
                url: apiurl + '/api/getwhenconchange',
                data: {
                    conid: this.refs.cons.value
                }, headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('logintoken')
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({'names': res.data.nn});

                    // localStorage.setItem('logintoken',res.data)
                })
        } else {
            let id = '';
            this.getcities(id);
            this.getcons(id);
            this.getnames(id);
            this.getstates(id);


        }
        console.log(this.refs.cons.value)
    }

    handlesearch() {
        console.log(this.refs.cities.value)
        console.log(this.refs.cons.value)
        console.log(this.refs.connumbers.value)
        console.log(this.refs.names.value)
        return window.location.assign('https://www.ywaymal.com/search_result/' + this.refs.cities.value + '/' + this.refs.cons.value + '/' + this.refs.connumbers.value + '/' + this.refs.names.value + '/')
    }

    //get cities

    render() {
        return (

            <div class="row pb-4 pb-sm-4 pb-md-4 pb-lg-4" style={{borderBottom: '3px solid #a6263912'}}>


                <div class="col-sm-12 col-md-2 mt-sm-4" style={{display: 'inline'}}>
                    <img src={process.env.PUBLIC_URL + '/images/logo/faef.png'}

                         style={{width: '100%'}}/>
                    {/*<h1 style={{marginTop:'33px'}}>*/}
                    {/*<span style={{color:'#7f7f7f'}}>Yway</span><span*/}
                    {/*style={{color:'#dc3545'}}> Mal</span>*/}

                    {/*</h1>*/}
                </div>
                <br></br>
                <div class="col-sm-12 col-md-10">
                    {/*menu*/}

                    <div class="col-sm-12 ">
                        <div class="row">
                            <div
                                class="pb-2 pt-2 col-md-6 d-flex justify-content-center justify-content-xs-end  justify-content-md-end">
                                <button class={"btn uni btn-sm btn-danger float-sm-none "}
                                        style={{color: 'rgb(220, 168, 63)', background: 'white'}}
                                >
                                    <span class="fa fa-info-circle"></span>&nbsp;&nbsp;

                                    Unicode
                                </button>
                                &nbsp;
                                <button class={"btn zaw btn-sm btn-danger float-sm-none "}
                                        style={{color: 'rgb(220, 168, 63)', background: 'white'}}
                                >
                                    <span class="fa fa-info-circle"></span>&nbsp;&nbsp;

                                    Zawgyi &nbsp;</button>
                                &nbsp;
                            </div>
                            <div
                                class="pt-sm-2 col-md-6 d-flex justify-content-center justify-content-xs-end  justify-content-md-end">
                                <div class=" ">
                                    <a href="https://www.ywaymal.com/home"
                                       class={"btn btn-sm btn-danger float-sm-none yk-background"}
                                       style={{color: 'white'}}
                                    >
                                        <span class="fa fa-home"></span>&nbsp;&nbsp;

                                        Home</a>
                                    &nbsp;
                                    <a href="https://www.ywaymal.com/about_us"
                                       class={"btn  btn-sm  btn-danger yk-background"}
                                       style={{color: 'white'}}
                                    >
                                        <span class="fa fa-info-circle"></span>&nbsp;&nbsp;

                                        About &nbsp;</a>
                                    &nbsp;

                                    <a href="https://www.ywaymal.com/contact_us"
                                       class={"btn  btn-sm  btn-danger yk-background"}
                                       style={{color: 'white'}}
                                    >
                                        <span class="fa fa-phone"></span>&nbsp;&nbsp;

                                        Contact&nbsp;</a>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/*menu*/}
                    <div class="row">&nbsp;</div>
                    <div class="row ml-2 mr-2  ml-md-3 mr-md-3">

                        <div style={{width: '100%'}}>
                            <div class="form-row">
                                {/*<div class="col-sm-4 col-lg-2 mt-3 mt-md-0">*/}
                                {/*<select ref='states' onChange={this.getwhenstatechange} class="btn btn-lg btn-danger input-lg yk-background" id="sel1" style={{*/}
                                {/*width: '100%', fontSize: '13px',*/}
                                {/*fontWeight: 'bolder'*/}
                                {/*}} required={'required'}>*/}
                                {/*<option value="none">States&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    </option>*/}
                                {/*{this.state.ssts.map((value) => {*/}
                                {/*// zawgyi error*/}

                                {/*return (*/}
                                {/*<option className="changeMe" value={value.id} >{value.name}</option>*/}
                                {/*)*/}
                                {/*})}*/}
                                {/*</select>*/}
                                {/*</div>*/}
                                <div class="col-6 col-sm-4 col-lg-2 mt-3 mt-md-0">
                                    <select ref='cities' onChange={this.getwhencitychange}
                                            class="btn btn-lg btn-danger input-lg yk-background" id="sel1" style={{
                                        width: '100%', fontSize: '13px',
                                        fontWeight: 'bolder'
                                    }} required={'required'}>
                                        <option value="none">
                                            Regions/States/Townships&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                        {this.state.cities.map((value) => {
                                            // zawgyi error
                                            return (
                                                <option className="changeMe" value={value.cors+value.id}>{value.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="col-6 col-sm-4 col-lg-2 mt-3 mt-md-0">

                                    <select ref="connumbers" onChange={this.getwhenconnumberschange}
                                            class="select3 btn btn-lg btn-danger input-lg yk-background" id="sel1" style={{
                                        width: '100%', fontSize: '13px',
                                        fontWeight: 'bolder'
                                    }} required={'required'}>
                                        <option value="none">Constituencies
                                            no. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    </option>

                                        {this.state.connumbers.map((value) => {
                                            return (
                                                <option value={value.id}>{value.number} {value.cities}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                                <div class="col-6 col-sm-4 col-lg-2 mt-3 mt-md-0">

                                    <select class="btn btn-lg btn-danger input-lg yk-background" ref="cons" id="sel1"
                                            onChange={this.getwhenconchange} style={{
                                        width: '100%', fontSize: '13px',
                                        fontWeight: 'bolder'
                                    }} required={'required'}>
                                        <option value="none">
                                            Constituencies  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                        {this.state.cons.map((value) => {
                                            return (
                                                <option
                                                    value={value.id}>{value.name} {value.number} {value.cities} </option>
                                            )

                                        })}
                                    </select>
                                </div>
                                <div class="col-6 col-sm-4 col-lg-2 mt-3 mt-lg-0">
                                    <select class="btn btn-lg btn-danger input-lg yk-background" ref="names" id="sel1"
                                            style={{
                                                width: '100%', fontSize: '13px',
                                                fontWeight: 'bolder'
                                            }} required={'required'}>
                                        <option value="none">
                                            Names/Parties &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                        {this.state.names.map((value) => {
                                            return (
                                                <option value={value.id}>{value.name}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                                <div class="col-6 col-sm-2 col-lg-2 mt-3 mt-lg-0">
                                    <button class="btn btn-danger " onClick={this.handlesearch}
                                            style={{
                                                color: '#dca83f',
                                                background: 'white',
                                                width: '100%',
                                                height: '87%'
                                            }}><span
                                        class="fa fa-search"></span> Search
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
                {/*menu*/}

                {/*search*/}
                {/*<div class="col-sm-12 col-md-8" style={{paddingTop: '32px'}}>*/}
                {/*<form style={{width: '100%', paddingLeft: '12px', paddingRight: '12px'}}>*/}
                {/*<div class="input-group">*/}
                {/*<input type="search" placeholder="What're you searching for?" aria-describedby="button-addon5"*/}
                {/*class="form-control"/>*/}
                {/*<div class="input-group-append">*/}
                {/*<button id="button-addon5" type="submit" class="btn btn-danger"><i class="fa fa-search"></i>Search*/}
                {/*</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</form>*/}
                {/*</div>*/}

                {/*<div class="col-sm-12 col-md-3 yk-menu-test mt-sm-4 mt-md-0">*/}
                {/*<div class="pt-md-4">*/}
                {/*<a href="home" class={"btn btn-default yk-temp-menu " + props.name.one} style={{color: '#7f7f7f'}}*/}
                {/*>*/}
                {/*<span class="fa fa-home"></span>*/}
                {/*<br></br>*/}
                {/*Home</a>*/}
                {/*<a href="about_us" className={"btn btn-default yk-temp-menu " + props.name.two}*/}
                {/*style={{color: '#7f7f7f'}}><span*/}
                {/*class="fa fa-info-circle"></span><br></br>About</a>*/}
                {/*<a href="contact_us" class={"btn btn-default yk-temp-menu " + props.name.three}*/}
                {/*style={{color: '#7f7f7f'}}><span*/}
                {/*class="fa fa-phone"></span><br></br>Contact</a>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*search*/}

            </div>
        )
    }


}

export default Header_menu_cat