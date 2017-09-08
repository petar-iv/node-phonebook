class App extends React.Component {
    
    constructor() {
        super()
        this.shared = { record: null };
    }
    
    render() {
        return (
            <ReactRouterDOM.HashRouter>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path="/home" component={() => <TableView shared={this.shared} />} />
                    <ReactRouterDOM.Route path="/edit" component={() => <EditForm shared={this.shared} />} />
                    <ReactRouterDOM.Route component={NotFound} />
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.HashRouter>
        )
    }

}
