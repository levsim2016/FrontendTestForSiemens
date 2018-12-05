import React, {Component} from 'react';

//компонент боковой панели
export default class Panel extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            isPanelExpanded: false
        };
        this.generateClassString = this.generateClassString.bind(this);
    }

    //функция для генерации строки классов для блока панели
    generateClassString(){
        let classString = 'panel ';
        const { isPanelExpanded } = this.state;
        const { left, right } = this.props;

        
         
        if(left !== undefined && left !== null)         //если панель слева, то соответствующий класс
            classString += 'left ';
        else if(right !== undefined && right !== null)  //иначе панель будет справа
            classString += 'right ';

        //классы для развернутой или свёрнутой панели
        if(isPanelExpanded)
            classString += 'opened';
        else
            classString += 'closed';

        return classString;
    }

    render(){
        return (
            <div className={this.generateClassString()}>
                <a href='' onClick={e => {
                    e.preventDefault();

                    //обновление графика посредством события масштабирования окна
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
                    this.setState({ isPanelExpanded: !this.state.isPanelExpanded });
                }}>
                    <img src='images/panelArrow.svg'/>
                </a>
            </div>
        );
    }
}