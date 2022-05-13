import React from "react"
import { Router, Route,Switch  } from "react-router-dom";

import Admin from "../Containers/Admin/Admin";
import Blogs from "../Containers/Blogs";

class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/admin/blogs" component={Blogs} />
            </Switch>
        )
    }
}
export default AppRouter;