import React from "react"
import { Router, Route,Switch  } from "react-router-dom";

import Projects from '../Containers/Projects/Projects';
import ProjectDetails from "../Containers/ProjectDetails/ProjectDetails";
import Admin from "../Containers/Admin/Admin";
import Blog from "../Containers/Blog/Blog";

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/blog" component={Blog} />
                <Route path="/admin" component={Admin} />
                <Route path="/project/details" component={ProjectDetails} />        
            </Switch>
        )
    }
}
export default AppRouter;