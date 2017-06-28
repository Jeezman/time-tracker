class TimerDashboard extends React.Component {

    state = {
        timers: [
            {
                title: 'Practice Squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 5456099,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: uuid.v4(),
                elapsed: 1273998,
                runningSince: null,
            },
        ],
    }

    render () {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList 
                        timers={this.state.timers}
                    />
                    <ToggableTimerForm isOpen={false} />
                </div>
            </div>
        )
    }
}

class EditableTimerList extends React.Component {
    render () {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
              key={timer.id}
              id={timer.id}
              title={timer.title}
              project={timer.project}
              elapsed={timer.elapsed}
              runningSince={timer.runningSince}
            />
        ))
        return (
            <div id="timers">
                {timers}
            </div>
        )
    }
}

class EditableTimer extends React.Component {

    state = {
        editFormOpen: false,
    }

    render () {
        if (this.state.editFormOpen) {
            return (
                <TimerForm 
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                />
            );
        } else {
            return (
                <Timer
                    id={this.props.id}
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


//ToggableTimerForm
//wrapper component around TimerForm
//accepts a single prop (isOpen) from its parent that affects its behaviour

class ToggableTimerForm extends React.Component {
    state = {
        isOpen: false,
    };

    //toggles state of form to open

    handleFormOpen = () => {
        this.setState({
            isOpen: true,
        });
    }

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm />
            )
        } else {
            return (
                <div className="ui basic content center aligned segment">
                    <button 
                        className="ui basic button icon"
                        onClick={this.handleFormOpen}
                    >
                        <i className="plus icon"/>
                    </button>
                </div>
            )
        }
    }
}


class Timer extends React.Component {
    render () {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="header">
                        {this.props.title}
                    </div>
                    <div className="meta">{this.props.project}</div>
                    <div className="center aligned description">
                        <h2>{elapsedString}</h2>
                    </div>
                    <div className="extra content">
                        <span className="right floated edit icon">
                            <i className="edit icon"></i>
                        </span>
                        <span className="right floated trash icon">
                            <i className="trash icon"></i>
                        </span>
                    </div>
                </div>
                <div className="ui bottom attached blue basic button">
                    Start
                </div>
            </div>
        )
    }
}

ReactDOM.render (
    <TimerDashboard />,
    document.getElementById('content')
);