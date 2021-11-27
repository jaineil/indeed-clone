import { Component } from "react";
import Navbar from "./Navbar";
import Registration from "./Registration";
  
export default class LandingPage extends Component{

    render(){
        return(
            <div>
                <Navbar />
                <Registration />
            </div>
        );
    };
}