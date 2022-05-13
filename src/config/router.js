import React from "react"
import { Router, Route, Switch } from "react-router-dom";

import Projects from "../Containers/Projects";
import Blogs from "../Containers/Blogs";
import Login from "../Containers/Login";

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Projects} />
                <Route path="/admin/projects" exact component={Projects} />
                <Route path="/admin/blogs" exact component={Blogs} />
                <Route path="/login" exact component={Login} />
            </Switch>
        )
    }
}
export default AppRouter;