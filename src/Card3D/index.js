import React from "react";
//
import "./style.scss";

// generator 써보고 싶어서 만듬
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

class Card3D extends React.Component {
    constructor(props) {
        super(props);

        let cardList = [];
        for (let i of range(1, 5)) {
            console.log("i", i);
            cardList.push({ name: i });
        }
        // let i = range(1, 5);
        // console.log("i", i.next());

        this.state = {
            cardList: cardList
        };
    }
    render() {
        return (
            <div className="Container-Card3D">
                {this.state.cardList.map((item, index) => {
                    return <div key={index}>{item.name}</div>;
                })}
            </div>
        );
    }
}

export default Card3D;
