import React from "react"
import { Router, Route,Switch  } from "react-router-dom";

import Home from '../Containers/Home/index';
import AboutUsPage from '../Containers/About/AboutUsPage';
import Services from '../Containers/Services/Services';
import Projects from '../Containers/Projects/Projects';
import Certification from "../Containers/Certification/Certification";
import Contact from "../Containers/Contact/Contact";
import ProjectDetails from "../Containers/ProjectDetails/ProjectDetails";
import Admin from "../Containers/Admin/Admin";
import Blog from "../Containers/Blog/Blog";

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={AboutUsPage} />
                <Route exact path="/services" component={Services} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/certification" component={Certification} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/blog" component={Blog} />
                <Route path="/admin" component={Admin} />
                <Route path="/project/details" component={ProjectDetails} />        
            </Switch>
        )
    }
}
export default AppRouter;