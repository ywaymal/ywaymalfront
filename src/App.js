// This File contains main css ,and route for the whole app
// follow comment is to tell jsx use for this ide
/*jshint esversion: 6 */

import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Login from './componennts/login';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Categories from "./componennts/Categories";
import Homepage from "./componennts/homepage";
import Footerpage from "./componennts/footerpage";
import Aboutus from "./componennts/Aboutus";
import Newsdetail from "./componennts/Newsdetail";
import Videodetail from "./componennts/videodetail";
import { createBrowserHistory as Bh } from 'history';



// function App() {
//   return (
//     <div className="App">    
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"c
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//this is create component with reactcomponent that is called stateful components
class Root extends React.Component {
    // this function is for to use js external link this link are in index.html
    // when u use functions of this js file u will add window each function call


    componentDidMount() {

        window.AOS.init({
            duration: 800,
            easing: 'slide'
        });

        var loader = function () {
            setTimeout(function () {
                window.$('#ftco-loader').removeClass('show');
                console.log('fff');
            }, 3000);
        };
        loader();
        var counter = function () {
            console.log('way point')
            window.$('#section-counter').waypoint(function (direction) {

                if (direction === 'down' && !window.$(this.element).hasClass('ftco-animated')) {

                    var comma_separator_number_step = window.$.animateNumber.numberStepFactories.separator(',')
                    window.$('.number').each(function () {
                        console.log('way point')
                        var $this = window.$(this),
                            num = $this.data('number');
                        console.log(num);
                        $this.animateNumber(
                            {
                                number: num,
                                numberStep: comma_separator_number_step
                            }, 7000
                        );
                    });

                }

            }, {offset: '95%'});

        }
        counter();
        var contentWayPoint = function () {
            var i = 0;
            window.$('.ftco-animate').waypoint(function (direction) {

                if (direction === 'down' && !window.$(this.element).hasClass('ftco-animated')) {

                    i++;

                    window.$(this.element).addClass('item-animate');
                    setTimeout(function () {

                        window.$('body .ftco-animate.item-animate').each(function (k) {
                            var el = window.$(this);
                            setTimeout(function () {
                                var effect = el.data('animate-effect');
                                if (effect === 'fadeIn') {
                                    el.addClass('fadeIn ftco-animated');
                                } else if (effect === 'fadeInLeft') {
                                    el.addClass('fadeInLeft ftco-animated');
                                } else if (effect === 'fadeInRight') {
                                    el.addClass('fadeInRight ftco-animated');
                                } else {
                                    el.addClass('fadeInUp ftco-animated');
                                }
                                el.removeClass('item-animate');
                            }, k * 50, 'easeInOutExpo');
                        });

                    }, 1000);

                }

            }, {offset: '95%'});
        };
        contentWayPoint();


        window.$(document).ready(function () {

            if ((window.screen.width < 900)) {
// if screen size is 1025px wide or larger
                window.$(".collapse").removeClass('show'); // you can also use $(".yourClass").hide();
            }

        });
        window.$(".yk-btn[data-id]").click(function () {
            var dyn = window.$(this).attr("data-id");
            if (window.$("#" + dyn).hasClass("yk-btn-active")) {
                window.$("#" + dyn).removeClass("yk-btn-active")

            } else {
                window.$("#" + dyn).addClass("yk-btn-active")

            }

            console.log(dyn)
        });
        console.log('start')
    }

    render() {

        return (
            <Router history={Bh}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    {/*<Route path="/header" component={Header_menu_cat}/>*/}
                    <Route exact path="/categories" component={Categories}/>
                    <Route exact path="/About_us" component={Aboutus}/>
                    <Route exact path="/news_detail" component={Newsdetail}/>
                    <Route exact path="/home" component={Homepage}/>
                    <Route exact path="/footer" component={Footerpage}/>
                     {/*this videotail route is for a route with query parameter*/}
                    <Route component={Videodetail}/>
                </Switch>
            </Router>
        );
    };
}

export default Root

