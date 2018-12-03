import React, {PureComponent} from 'react';
import Panel from './Panel';
import Graph from './Graph';

export default class App extends PureComponent{
    render(){
        return (
            <div className='appContainer'>
                <Panel left>
                    <div>   
                        dfsd
                    </div>
                </Panel>
                <Graph/>
                <Panel right>
                    <div>
                        dsfdsf
                    </div>
                </Panel>
            </div>
        );
    }
}