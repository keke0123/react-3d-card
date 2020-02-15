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

        this.clickedCard = null;
        this.state = {
            rotate: false,
            cardList: cardList,
            clicked: false
        };
    }

    toggleCardClick = async item => {
        console.log("toggle click");
        if (this.state.clicked == false) {
            this.setState({
                clicked: true
            });
        } else {
            console.log("item", item);
            this.clickedCard = item;
            this.rotateCard();
        }
    };

    rotateCard = async () => {
        console.log("clicked card", this.clickedCard);
        if (this.state.cardList[0].name != this.clickedCard.name) {
            console.log("rotate");
            await this.setState({
                rotate: true
            });
        }
    };

    rotateAniEnd = async e => {
        console.log("animation end!!!!!", e);
        console.log("animation name", e.animationName); // rotate
        await this.setState(prev => {
            return {
                rotate: false,
                cardList: [
                    ...prev.cardList.filter((val, index) => index != 0),
                    prev.cardList[0]
                ]
            };
        });
        setTimeout(() => {
            if (this.state.cardList[0].name != this.clickedCard.name) {
                this.rotateCard();
            }
        }, 0);
    };

    render() {
        return (
            <div className="Container-Card3D">
                {this.state.cardList.map((item, index) => {
                    console.log("index", index);
                    return (
                        <div
                            key={index}
                            className={`card-box index-${index + 1} ${
                                this.state.clicked ? "clicked" : ""
                            } ${index == 0 && this.state.rotate ? "rotate" : ""}
                            `}
                            onClick={() => this.toggleCardClick(item)}
                            onAnimationEnd={this.rotateAniEnd}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Card3D;
