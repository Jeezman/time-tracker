class TimerDashboard extends React.Component {
  state = {
    timers: [
      {
        title: "Practice Squat",
        project: "Gym Chores",
        id: uuid.v4(),
        elapsed: 5456099,
        runningSince: Date.now()
      },
      {
        title: "Bake squash",
        project: "Kitchen Chores",
        id: uuid.v4(),
        elapsed: 0,
        runningSince: null
      }
    ]
  };

  handleEditFormSubmit = attrs => {
    this.updateTimer(attrs);
  };

  // inserts a new timer into our timer list state
  handleCreateFormSubmit = timer => {
    this.createTimer(timer);
  };

  createTimer = timer => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  };

  updateTimer = attrs => {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          });
        } else {
          return timer;
        }
      })
    });
  };

  handleTrashClick = timerId => this.deleteTimer(timerId);

  deleteTimer = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    });
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          {/* specifies whether or not EditableTimer should be rendered with its edit form open */}
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
          <ToggableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map(timer => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return <div id="timers">{timers}</div>;
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = timer => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
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
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

//renders a form for creating a new timer or editing an existing one
class TimerForm extends React.Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || ""
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleProjectChange = e => {
    this.setState({ project: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  };

  render() {
    //use the id property to determine whether or not an object has been created
    const submitText = this.props.id ? "Update" : "Create";
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="">Project</label>
              <input
                type="text"
                value={this.state.project}
                onChange={this.handleProjectChange}
              />
            </div>
            <div className="ui two bottom attached buttons">
              <button
                className="ui basic blue button"
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className="ui basic red button"
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class ToggableTimerForm extends React.Component {
  state = {
    isOpen: false
  };

  //toggles state of form to open

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleFormClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleFormSubmit = timer => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  render() {
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed,
      this.props.runningSince
    );
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span
              className="right floated edit icon hover-icon"
              onClick={this.props.onEditClick}
            >
              <i className="edit icon" />
            </span>
            <span
              className="right floated trash icon hover-icon"
              onClick={this.handleTrashClick}
            >
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <div className="ui bottom attached blue basic button">Start</div>
      </div>
    );
  }
}

ReactDOM.render(<TimerDashboard />, document.getElementById("content"));
