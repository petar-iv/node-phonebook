class EditForm extends React.Component {
    
    constructor(props) {
        super()
        if (props.shared.record) {
            var form = props.shared.record
            props.shared.record = null
        } else {
            form = {}
        }
        this.state = { form: form, success: null, error: null }
        this.save = this.save.bind(this)
        this.updateForm = this.updateForm.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }
    
    success () {
        let self = this
        this.setState({ success: true, error: null })
        setTimeout(function() {
            self.clearAll()
        }, 2500)
    }
    
    failure (status, error) {
        let message = 'Status: ' + status;
        if (error) {
            message += ', Error: ' + error
        }
        this.setState({ success: false, error: message })
    }
    
    updateForm(property, value) {
        let obj = {};
        obj[property] = value;
        const updatedForm = Object.assign({}, this.state.form, obj)
        this.setState({ form: updatedForm })
    }
    
    goToHome() {
        window.location.href = "/#/home"
    }
    
    clearAll() {
        this.setState({ form: {}, success: null, error: null})
    }
    
    save() {
        const data = this.state.form
        if (!!data.id) {
         var method = 'PUT'
         var url = '/rest/records/' + data.id 
        } else {
            method = 'POST',
            url = '/rest/records/'
        }
        
        let self = this
        jQuery.ajax({
            method: method,
            url: url,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(data),
            success: function() {
                self.success()
            },
            error: function(xhr) {
                self.failure(xhr.status, xhr.responseText)
            }
        })
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h4>Phone number entry</h4></div>
                <div className="panel-body">
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" readOnly disabled className="form-control" value={this.state.form.id || ''}/>
                    </div>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" value={this.state.form.firstName || ''} onChange={(e) => { this.updateForm('firstName', e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" value={this.state.form.lastName || ''} onChange={(e) => { this.updateForm('lastName', e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Phone number</label>
                        <input type="text" className="form-control" value={this.state.form.number || ''} onChange={(e) => { this.updateForm('number', e.target.value) }} />
                    </div>
                    <div>
                        <button className="btn btn-primary pull-left" onClick={ this.goToHome } >Home</button>
                        <button className="btn btn-primary pull-right" onClick={ this.save } >Save</button>
                    </div>
                    <br/>
                    <br/>
                    <div>
                         {!!this.state.success && <h4 className="bg-success">All good</h4>}
                         {!!this.state.error && <h4 className="bg-danger">{this.state.error}</h4>}
                     </div>
                </div>
            </div>
        )
    }
    
}