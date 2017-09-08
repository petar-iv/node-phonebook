class TableView extends React.Component {
    
    constructor(props) {
        super()
        this.state = { records: [] }
        
        this.shared = props.shared
        this.goToForm = this.goToForm.bind(this)
        this.delete = this.delete.bind(this)
    }
    
    goToForm() {
        window.location.href = "/#/edit"
    }
    
    delete(id) {
        let self = this
        jQuery.ajax({
            method: 'DELETE',
            url: '/rest/records/' + id,
            success: function() {
                let updatedRecords = self.state.records.filter(record => record.id !== id)
                self.setState({ records: updatedRecords })
            },
            error: function(xhr) {
                alert('Could not delete record #' + id + '. Status: ' + xhr.status + ', Error: ' + xhr.responseText)
            }
        })
    }
    
    componentDidMount() {
        let self = this
        jQuery.ajax({
            url: "/rest/records/",
            success: function(data) {
                self.setState({ records: data })
            },
            error: function(xhr, status, error) {
                alert("Status: " + xhr.status + "\n\n" + xhr.responseText)
            }
        })
    }
    
    render() {
        return (
        <div className="panel panel-default">
            <div className="panel-heading"> <h4>List of phonebook records</h4> </div>
            <div className="panel-body">             
                <table className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {  this.state.records.map((record) => {
                        return (<tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.number}</td>
                                    <td>
                                    <button className="btn btn-default" onClick={(e) => { this.shared.record = record; this.goToForm() }}> <span className="glyphicon glyphicon-pencil"></span> Edit</button>
                                    <button className="btn btn-default" onClick={(e) => {this.delete(record.id)}}> <span className="glyphicon glyphicon-remove"></span> Delete</button>
                                    </td>
                                </tr>)
                    }) }
                    </tbody>
                </table>
                <br/>
                <div>
                    <button className="btn btn-primary pull-right" onClick={this.goToForm}>Create new</button>
                </div>
            </div>
        </div>
        )
    }
    
}