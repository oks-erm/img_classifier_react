import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    componentDidMount() {
        fetch('https://image-classifier-4o7b.onrender.com/profile/' + this.props.user.id)
            .then(response => response.json())
            .then(result => this.setState({ history: result.history }));
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="mw7 center flex flex-column">
                <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pointer'>Back to detection</p>
                <h2 className="f2 mb0 mt0" >History</h2>
                <h3 className="f4 mb0 mt2">{this.state.history.length} images</h3>
                <ul className="list pl0">
                    {this.state.history.map((entry, index) => (
                        <article key={index} className="br3 ba b--black-10 mv1 bg-navy shadow-5 center">
                            <img src={entry.url} alt="Preview" className="w-20 h-20 mr3 br3" />
                            <div className="w-80 pa3 ph3-ns pb3-ns white" style={{ overflowWrap: 'anywhere'}}>
                                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="f5 link white pointer">{entry.url}</a>
                                <p className="f6 mt1">Uploaded on: {entry.uploaded_at.slice(0, 10)} {entry.uploaded_at.slice(11, 16)}</p>
                            </div>
                        </article>
                    ))}
                </ul>
            </div>
        );
    }


}

export default Profile;
