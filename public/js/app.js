class TimerDashboard extends React.Component {
    render () {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList />
                    <ToggableTimerForm isOpen={true} />
                </div>
            </div>
        )
    }
}

class EditableTimerList extends React.Component {
    render () {
        return (
            <div id="timers">
                <EditableTimer 
                    title="Learn React"
                    project="Web Domination"
                    elapsed="8986300"
                    runningSince={null}
                    editFormOpen={false}
                />
                <EditableTimer
                    title="Learn extreme ironing"
                    project="World domination"
                    elapsed="3890985"
                    runningSince={null}
                    editFormOpen={true}
                />
            </div>
        )
    }
}

class EditableTimer extends React.Component {
    render () {
        if (this.props.editFormOpen) {
            return (
                <TimerForm 
                    title={this.props.title}
                    project={this.props.project}
                />
            );
        } else {
            return (
                <Timer
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                 />
            )
        }
    }
}

//renders a form for creating a new timer or editing an existing one
class TimerForm extends React.Component {
    render () {
        // uses the presence of this.props.title to determine what text the submit button should display
        const submitText = this.props.title ? 'Update' : 'Create';
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label htmlFor="">Title</label>
                            <input type="text" defaultValue={this.props.title} />
                        </div>
                        <div className="field">
                            <label htmlFor="">Project</label>
                            <input type="text" defaultValue={this.props.project}/>
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button">
                                {submitText}
                            </button>
                            <button className="ui basic red button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}