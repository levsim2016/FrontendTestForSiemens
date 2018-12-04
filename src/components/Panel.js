import React, {Component} from 'react';

export default class Panel extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            isPanelExpanded: false
        };
        this.generateClassString = this.generateClassString.bind(this);
    }

    generateClassString(){
        let classString = 'panel ';
        const { isPanelExpanded } = this.state;
        const { left, right } = this.props;

        if(left !== undefined && left !== null)
            classString += 'left ';
        else if(right !== undefined && right !== null)
            classString += 'right ';

        if(isPanelExpanded)
            classString += 'opened';
        else
            classString += 'closed';

        return classString;
    }

    render(){
        return (
            <div className={this.generateClassString()}>
                { this.props.children }
            </div>
        );
    }
}